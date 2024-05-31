import { randomInt } from "crypto";
import { TEventArchiveCamFace } from "../types/index.mjs";


export const generatePersonEvent = (count: number) => {
  let personArr: TEventArchiveCamFace[] = [];
  for (let i = 0; i < count; i++) {
    let date = new Date(
      2023,
      5,
      30,
      randomInt(0, 24),
      randomInt(0, 60),
      randomInt(0, 60)
    );
    personArr.push({
      ChannelId: "094ff267-47c3-457f-96d7-66698daa6935",
      ChannelName: "Камера 9",
      Event: {
        AdditionalInfo: "",
        Age: randomInt(12, 40),
        Emotion: randomInt(0, 3),
        EventName: "FaceDetectedNotifyEvent",
        EventTime: date,
        FaceId: "fe705eb2-4f76-47eb-92eb-178c0ccf7077",
        FaceImageBase64: "base64 jpeg image",
        FirstName: "",
        Gender: randomInt(0, 1) as 0 | 1,
        Groups: [],
        IsIdentified: true,
        LastName: "",
        Patronymic: "",
        Height: 0.152734375,
        Left: 0.56064453125,
        Top: 0.3083984375,
        Width: 0.11455078125,
        Similarity: 0.9900000095367432,
      },
      EventCategory: 1,
      EventComment: "",
      EventDescription: "Обнаружено лицо (Модуль распознавания лиц)",
      EventId: "427f1cc3-2c2f-4f50-8865-56ae99c3610d",
      EventInitiatorType: 0,
      Timestamp: date,
    });
  }
  return personArr;
};
