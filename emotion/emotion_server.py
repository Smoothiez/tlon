from keras.models import load_model
from time import sleep
from keras.preprocessing.image import img_to_array
from keras.preprocessing import image
from flask import Flask, Response

import cv2
import numpy as np

face_classifier = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')

classifier =load_model('./emotion_model.h5')
classifier._make_predict_function()

class_labels = ['Upset','Happy','Neutral','Sad','Surprise']

# def face_detector(img):
#     # Convert image to grayscale
#     gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
#     faces = face_classifier.detectMultiScale(gray,1.3,5)
#     if faces is ():
#         return (0,0,0,0),np.zeros((48,48),np.uint8),img

#     for (x,y,w,h) in faces:
#         cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
#         roi_gray = gray[y:y+h,x:x+w]

#     try:
#         roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)
#     except:
#         return (x,w,y,h),np.zeros((48,48),np.uint8),img
#     return (x,w,y,h),roi_gray,img

app = Flask(__name__)

@app.route('/')
def index():
    return Response(gen(cv2.VideoCapture(0)), mimetype='multipart/x-mixed-replace; boundary=frame')

def gen(cap):
    count = 0
    while True:
        print("GRABBING FRAME " + str(count))
        count += 1
        # Grab a single frame of video
        ret, frame = cap.read()
        labels = []
        gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray,1.3,5)
        print(faces)

        for (x,y,w,h) in faces:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,255,255),2)
            roi_gray = gray[y:y+h,x:x+w]
            roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)
        # rect,face,image = face_detector(frame)


            if np.sum([roi_gray])!=0:
                print("FACE FOUND")
                roi = roi_gray.astype('float')/255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi,axis=0)

            # make a prediction on the ROI, then lookup the class

                preds = classifier.predict(roi)[0]
                label=class_labels[preds.argmax()]
                label_position = (x,y)
                cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_DUPLEX,1,(255,255,255),2)
            else:
                print("FACE NOT FOUND")
                cv2.putText(frame,'No Face Found',(20,60),cv2.FONT_HERSHEY_DUPLEX,1,(255,255,255),2)

        _, jpeg = cv2.imencode('.jpg', frame)
        frame = jpeg.tobytes()        
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True,threaded=False)

#    cv2.imshow('Emotion Detector',frame)
#    if cv2.waitKey(1) & 0xFF == ord('q'):
#        break

cap.release()
cv2.destroyAllWindows()


























