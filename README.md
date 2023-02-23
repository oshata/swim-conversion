# Swim conversion server for CS361

### Request Data
For the POST request data for the program it will require the following items:  
    
    convert_from,
    convert_to,
    distance,
    stroke,
    your_time_minutes,
    your_time_seconds,
    your_time_milliseconds
    
    Endpoint is /convert

from the front end to be able to parce the data.

### Recieve Data
once the number are crunched it will return a responce in the form of res.send with the following data:
    converted_minutes,
    converted_seconds,
    converted_milliseconds


### UML Diagram
![image](https://user-images.githubusercontent.com/78832578/218649622-d3aae3ce-edcf-46cb-9ee9-4c2b5dcbea69.png)

