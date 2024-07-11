import dayjs from 'dayjs';
import { STATUS_OPTIONS } from '../data/STATUS_OPTIONS';
import { STAFF_OPTIONS } from '../data/STAFF_OPTIONS';
import demoImage1Url from '../images/demoImage1.jpg';

export default function createDemoEntry(index: number) {
  // Dates
  const START_DAY = Math.round(Math.random() * 60);
  const DAY_DIFF = Math.round(Math.random() * 5);
  const IS_PAST = Math.round(Math.random()) === 0 ? 1 : -1;
  const START_DATE = dayjs().subtract(START_DAY * IS_PAST, 'day');
  const END_DATE = START_DATE.add(DAY_DIFF, 'day');

  // Status
  const STATUS = STATUS_OPTIONS[Math.round(Math.random() * 2)];

  // Staff
  const STAFF_INDICIES = new Set<number>();
  const NUM_STAFFS = Math.round(Math.random() * 5);
  for (let i = 0; i < NUM_STAFFS; i++) {
    const j = Math.round(Math.random() * (STAFF_OPTIONS.length - 1));
    STAFF_INDICIES.add(j);
  }
  const STAFFS_ARRAY = [...STAFF_INDICIES].map((i) => ({
    answerId: 23412,
    value: null,
    relateId: STAFF_OPTIONS[i].id,
    relateLabel: STAFF_OPTIONS[i].label,
    filename: null,
    mimeType: null,
    geometry: null,
  }));

  // Images
  const IMAGES = [];
  const NUM_IMAGES = Math.round(Math.random() * 3);
  for (let i = 0; i < NUM_IMAGES; i++) {
    IMAGES.push({
      answerId: 23412,
      value: null,
      relateId: null,
      relateLabel: null,
      filename: demoImage1Url,
      mimeType: null,
      geometry: null,
    });
  }

  // Generated
  const label = 'This is a fake label';

  return {
    formId: 147,
    entryId: 1000 + Number(index),
    label: label,
    contents: [
      {
        questionId: 840,
        type: 'Text',
        label: 'Job title',
        answers: [
          {
            answerId: 23411,
            value: label,
            relateId: null,
            relateLabel: null,
            filename: null,
            mimeType: null,
            geometry: null,
          },
        ],
      },
      {
        questionId: 841,
        type: 'TextArea',
        label: 'Description',
        answers: [
          {
            answerId: 23411,
            value: 'This is a fake description',
            relateId: null,
            relateLabel: null,
            filename: null,
            mimeType: null,
            geometry: null,
          },
        ],
      },
      {
        questionId: 842,
        type: 'Date',
        label: 'Scheduled start date',
        answers: [
          {
            answerId: 23411,
            value: START_DATE.format('DD-MMM-YYYY'),
            relateId: null,
            relateLabel: null,
            filename: null,
            mimeType: null,
            geometry: null,
          },
        ],
      },
      {
        questionId: 843,
        type: 'Date',
        label: 'Scheduled end date',
        answers: [
          {
            answerId: 23411,
            value: END_DATE.format('DD-MMM-YYYY'),
            relateId: null,
            relateLabel: null,
            filename: null,
            mimeType: null,
            geometry: null,
          },
        ],
      },
      {
        questionId: 836,
        type: 'Relate',
        label: 'Status',
        answers: [
          {
            answerId: 23411,
            value: null,
            relateId: STATUS.id,
            relateLabel: STATUS.label,
            filename: null,
            mimeType: null,
            geometry: null,
          },
        ],
      },
      {
        questionId: 838,
        type: 'Relate many',
        label: 'STAFFs',
        answers: STAFFS_ARRAY,
      },
      {
        questionId: 848,
        type: 'File many',
        label: 'Images',
        answers: IMAGES,
      },
    ],
  };
}
