export type LibraryRes = {
  SeoulLibraryBookRentNumInfo: {
    list_total_count: number;
    RESULT: {
      CODE: string;
      MESSAGE: string;
    };
    row: BookRentBest[];
  };
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
