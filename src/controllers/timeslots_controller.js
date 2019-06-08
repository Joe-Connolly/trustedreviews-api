/* eslint-disable import/prefer-default-export */
import { getAllTimeSlots } from '../services/timeSlotHelper';

export const getTimeslots = (req, res) => {
  const slotLength = 60;
  // getAllProducts(res);
  let workingHours = [
    { startTime: '2019-06-07T09:00:00.000-04:00', endTime: '2019-06-07T17:00:00.000-04:00' },
    { startTime: '2019-06-08T09:00:00.000-04:00', endTime: '2019-06-08T17:00:00.000-04:00' },
    { startTime: '2019-06-09T09:00:00.000-04:00', endTime: '2019-06-09T17:00:00.000-04:00' },
  ];
  let appointments = [
    { startTime: '2019-06-07T09:00:00.000-04:00', endTime: '2019-06-07T09:30:00.000-04:00' },
    { startTime: '2019-06-07T10:00:00.000-04:00', endTime: '2019-06-07T10:15:00.000-04:00' },
    { startTime: '2019-06-07T14:00:00.000-04:00', endTime: '2019-06-07T17:00:00.000-04:00' },
    { startTime: '2019-06-08T09:00:00.000-04:00', endTime: '2019-06-08T10:00:00.000-04:00' },
    { startTime: '2019-06-08T12:00:00.000-04:00', endTime: '2019-06-08T14:00:00.000-04:00' },
    { startTime: '2019-06-09T12:00:00.000-04:00', endTime: '2019-06-09T12:30:00.000-04:00' },
  ];

  workingHours = workingHours.map((workingHour) => {
    return { startTime: new Date(workingHour.startTime), endTime: new Date(workingHour.endTime) };
  });

  appointments = appointments.map((workingHour) => {
    return { startTime: new Date(workingHour.startTime), endTime: new Date(workingHour.endTime) };
  });

  res.send(getAllTimeSlots(workingHours, appointments, slotLength));
};
