export type LibraryRes = {
  SeoulLibraryBookRentNumInfo?: LibraryBookInfo;
  SeoulLibraryBookSearchInfo?: LibraryBookInfo;
};

export type LibraryBookInfo = {
  list_total_count: number;
  RESULT: {
    CODE: string;
    MESSAGE: string;
  };
  row: BookRentBest[] | BookRent[];
};

export type BookRentBest = {
  CONTROLNO: string;
  TITLE: string;
  AUTHOR: string;
  PUBLISHER: string;
  PUBLISHER_YEAR: number;
  ISBN: string;
  CLASS_NO: number;
  CNT: number;
};

export type BookRent = {
  CTRLNO: string;
  TITLE: string;
  AUTHOR: string;
  PUBLER: string;
  PUBLER_YEAR: number;
  ISBN: string;
  CLASS_NO: number;
  LOAN_STATUS_NAME: string;
  SUB_LOCA_NAME: string;
  [key: string]: string | number;
};
