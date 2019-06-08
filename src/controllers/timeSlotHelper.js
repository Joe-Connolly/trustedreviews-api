/* eslint-disable import/prefer-default-export */

const getMillis = (minutes) => {
  return minutes * 60 * 1000;
};

const getTimeDiffMillis = (t1, t2) => {
  return t2.getTime() - t1.getTime();
};

const getFreeTimes = (workingHour, appointments) => {
  let { startTime } = workingHour;
  let endTime;
  const freeTimes = [];
  appointments.forEach((appointment) => {
    endTime = appointment.startTime;
    if (endTime.getTime() !== startTime.getTime()) {
      freeTimes.push({ startTime, endTime });
    }
    startTime = appointment.endTime;
  });
  if (workingHour.endTime.getTime() !== startTime.getTime()) {
    freeTimes.push({ startTime, endTime: workingHour.endTime });
  }
  return freeTimes;
};

export const getTimeSlots = (workingHour, appointments, slotLength) => {
  const freeTimes = getFreeTimes(workingHour, appointments);
  const slotLengthMillis = getMillis(slotLength);
  const timeSlots = [];
  freeTimes.forEach((freeTime) => {
    let { startTime } = freeTime;
    let endTime;
    while (startTime < freeTime.endTime) {
      endTime = new Date(startTime.getTime() + slotLengthMillis);
      console.log(startTime, endTime, freeTime, slotLengthMillis, slotLength);
      if (+endTime <= +freeTime.endTime) {
        timeSlots.push({ startTime, endTime });
      }
      startTime = endTime;
    }
  });
  console.log('timeSlots', timeSlots);
  return timeSlots;
};

export const getAllTimeSlots = (workingHours, appointments, slotLength) => {
  const timeSlots = [];
  let currAppointment = 0;
  workingHours.forEach((workingHour) => {
    const concurrentAppointments = [];
    while (currAppointment < appointments.length
      && appointments[currAppointment].startTime < workingHour.endTime) {
      concurrentAppointments.push(appointments[currAppointment]);
      currAppointment += 1;
    }
    timeSlots.push(getTimeSlots(workingHour, concurrentAppointments, slotLength));
  });
  return timeSlots;
};
