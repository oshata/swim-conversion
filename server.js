'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());

app.post('/convert', (req, res) => {
  const {
    convert_from,
    convert_to,
    distance,
    stroke,
    your_time_minutes,
    your_time_seconds,
    your_time_milliseconds,
  } = req.body;

  let totalTimeInSeconds =
    your_time_minutes * 60 + your_time_seconds + your_time_milliseconds / 1000;

  let adjustment = 0;
  let adjustmentFactor = 0;

  let yourTime = totalTimeInSeconds;

  if (convert_from === 'shortCourseYards' && convert_to === 'longCourseMeters') {
    if (distance === 500 || distance === 1000){
      adjustmentFactor = 0.8925;
    }
    else if (distance === 1650){
      adjustmentFactor = 1.02;
    }
    else {
      adjustmentFactor = 1.11;
    }

    switch (stroke.value) {
      case 'butterfly':
        switch (distance.value) {
          case '50':
            adjustment = 0.7;
            break;
          case '100':
            adjustment = 1.4;
            break;
          case '200':
            adjustment = 2.8;
            break;
          case '400':
            adjustment = 6.4;
            break;
        }
        break;
      case 'backstroke':
        switch (distance.value) {
          case '50':
            adjustment = 0.6;
            break;
          case '100':
            adjustment = 1.2;
            break;
          case '200':
            adjustment = 2.4;
            break;
        }
        break;
      case 'breaststroke':
        switch (distance.value) {
          case '50':
            adjustment = 1.0;
            break;
          case '100':
            adjustment = 2.0;
            break;
          case '200':
            adjustment = 4.0;
            break;
        }
        break;
      case 'freestyle':
        switch (distance.value) {
          case '50':
            adjustment = 0.8;
            break;
          case '100':
            adjustment = 1.6;
            break;
          case '200':
            adjustment = 3.2;
            break;
          case '500':
            adjustment = 6.4;
            break;
          case '1000':
            adjustment = 12.8;
            break;
          case '1650':
            adjustment = 24.0;
            break;
        }
        break;
      case 'ind_medley':
        switch (distance.value) {
          case '200':
            adjustment = 3.2;
            break;
          case '400':
            adjustment = 6.4;
            break;
        }
        break;
    }
} else if (convert_from === 'longCourseMeters' && convert_to === 'shortCourseYards') {
    if (distance === 400 || distance === 800){
      adjustmentFactor = 1 / 0.8925;
    }
    else if (distance === 1500){
      adjustmentFactor = 1 / 1.02;
    }
    else {
      adjustmentFactor = 1 / 1.11;
    }

    switch (stroke.value) {
      case 'butterfly':
        switch (distance.value) {
          case '50':
            adjustment = 0.7;
            break;
          case '100':
            adjustment = 1.4;
            break;
          case '200':
            adjustment = 2.8;
            break;
          case '400':
            adjustment = 6.4;
            break;
        }
        break;
      case 'backstroke':
        switch (distance.value) {
          case '50':
            adjustment = 0.6;
            break;
          case '100':
            adjustment = 1.2;
            break;
          case '200':
            adjustment = 2.4;
            break;
        }
        break;
      case 'breaststroke':
        switch (distance.value) {
          case '50':
            adjustment = 1.0;
            break;
          case '100':
            adjustment = 2.0;
            break;
          case '200':
            adjustment = 4.0;
            break;
        }
        break;
      case 'freestyle':
        switch (distance.value) {
          case '50':
            adjustment = 0.8;
            break;
          case '100':
            adjustment = 1.6;
            break;
          case '200':
            adjustment = 3.2;
            break;
          case '400':
            adjustment = 6.4;
            break;
          case '800':
            adjustment = 12.8;
            break;
          case '1500':
            adjustment = 24.0;
            break;
        }
        break;
      case 'ind_medley':
        switch (distance.value) {
          case '200':
            adjustment = 3.2;
            break;
          case '400':
            adjustment = 6.4;
            break;
        }
        break;
    }
  }

  let convertedTime = ((yourTime - adjustment) * (adjustmentFactor) / 100);

  const converted_minutes = { value: Math.floor(convertedTime / 60) };
  const converted_seconds = { value: Math.floor(convertedTime % 60) };
  const converted_milliseconds = { value: (convertedTime % 1) * 1000 };

  res.send({
    convertedTime,
    converted_minutes,
    converted_seconds,
    converted_milliseconds,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
