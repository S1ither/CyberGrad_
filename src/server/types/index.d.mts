import { DataSourceOptions } from "typeorm";

export type ServerOption = {
  ssl: {
    key: string;
    cert: string;
    passphrase: string;
    alowHTTP1: boolean;
  };
  port: number;
  host: string;
  staticPath: string;
  db?: DataSourceOptions;
};

export type resJSON = {
  message: string;
  code: number;
  obj: object;
};

export type HttpHeader = {
  "Access-Control-Request-Header"?: string | undefined;
  "Access-Control-Allow-Methods"?: string | string[] | undefined;
  "Access-Control-Allow-Headers"?: string | undefined;
  "Access-Control-Allow-Origin"?: string | undefined;
  Connection?: string | undefined;
  "Content-Encoding"?: string | undefined;
  "Content-Type"?: string | undefined;
  Date?: Date | string | undefined;
  Etag?: string | undefined;
  "Keep-Alive"?: string | undefined;
  "Last-Modified"?: Date | string | undefined;
  Server?: string | undefined;
  "Set-Cookie"?: string | undefined;
  "Transfer-Encoding"?: string | undefined;
  Vary?: string | undefined;
  "X-Backend-Server"?: string | undefined;
  "X-Cache-Info"?: string | undefined;
  "X-kuma-revision"?: string | undefined;
  "x-frame-options"?: string | undefined;
};

export type requestBodyParse = {
  name: string;
  value: string;
  filename: string;
};

export type TEventArchiveCamFace = {
  ChannelId: "094ff267-47c3-457f-96d7-66698daa6935";
  ChannelName: "Камера 9";
  Event: {
    AdditionalInfo: string;
    Age: number;
    Emotion: number;
    EventName: "FaceDetectedNotifyEvent";
    EventTime: Date;
    FaceId: "fe705eb2-4f76-47eb-92eb-178c0ccf7077";
    FaceImageBase64: "base64 jpeg image";
    FirstName: string;
    Gender: 0 | 1;
    Groups: string[];
    IsIdentified: true;
    LastName: string;
    Patronymic: string;
    Height: 0.152734375;
    Left: 0.56064453125;
    Top: 0.3083984375;
    Width: 0.11455078125;
    Similarity: 0.9900000095367432;
  };
  EventCategory: 1;
  EventComment: string;
  EventDescription: "Обнаружено лицо (Модуль распознавания лиц)";
  EventId: "427f1cc3-2c2f-4f50-8865-56ae99c3610d";
  EventInitiatorType: 0;
  Timestamp: Date;
};
