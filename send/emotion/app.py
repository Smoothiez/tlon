from keras.models import load_model
from time import sleep
from keras.preprocessing.image import img_to_array
from keras.preprocessing import image
import cv2
import numpy as np
import socketio
import base64

face_classifier = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')
classifier =load_model('./emotion_model.h5')
classifier._make_predict_function()
class_labels = ['Upset','Happy','Neutral','Sad','Surprise']

print('---------------------- Initializing Socket ----------------------')
sio = socketio.Client()
sio.connect('http://178.62.39.153:8080?token=1', namespaces=['/send'])
print('socket.io session ID:', sio.sid)

def gen():
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        labels = []
        gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray,1.3,5)
        print(faces)

        for (x,y,w,h) in faces:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,255,255),2)
            roi_gray = gray[y:y+h,x:x+w]
            roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)
            if np.sum([roi_gray])!=0:
                print("FACE FOUND")
                roi = roi_gray.astype('float')/255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi,axis=0)
                preds = classifier.predict(roi)[0]
                label=class_labels[preds.argmax()]
                label_position = (x,y)
                cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_DUPLEX,1,(255,255,255),2)
            else:
                print("FACE NOT FOUND")
                cv2.putText(frame,'No Face Found',(20,60),cv2.FONT_HERSHEY_DUPLEX,1,(255,255,255),2)

        _, jpeg = cv2.imencode('.jpg', frame)
        encoded_jpeg = base64.b64encode(jpeg)
        print(base64.b64encode(jpeg))
        sio.emit('frame', encoded_jpeg)
        #frame = jpeg.tobytes()
        #yield (b'--frame\r\n'
            #b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
    cap.release()
    cv2.destroyAllWindows()

gen()
