import { TEventArchiveCamFace } from "../types/index.mjs";
import { generatePersonEvent } from "./constructor.mjs";
import {} from ""

export const parseDataFromDB = () => {
  let data = generatePersonEvent(100);
  let hour = new Map<number, Map<number, TEventArchiveCamFace[]>>();
  for (let i = 0; i < 25; i++) {
    hour.set(i, new Map());
    for (let j = 0; j < 3; j++) {
      hour.get(i)!.set(j, []);
    }
  }
  for (const item of data) {
    let time = item.Timestamp.getHours();
    let emotion: TEventArchiveCamFace[] | [] = hour
      .get(time)!
      .get(item.Event.Emotion)!;
    emotion.push(item);
    hour.set(time, hour.get(time)!.set(item.Event.Emotion, emotion));
  }
  data = {} as any;
  hour.forEach((v, k) => {
    v.forEach((j, i) => {
      data[k] = Object([i, j]);
    });
  });
  
};
