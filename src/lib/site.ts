// Band + show metadata, kept separate from the discography data.

export const BAND = {
  name: "A Thousand Feet Per Second",
  domain: "https://athousandfeetpersecond.com",
};

export interface ShowSlot {
  time: string;
  act: string;
}

export const SHOW = {
  venue: "Montrose Saloon",
  address: "2933 W Montrose Ave",
  city: "Chicago, IL",
  date: "Friday, October 9, 2026",
  /** Doors / first set, America/Chicago. Drives the homepage countdown + show-night flip. */
  startsAt: "2026-10-09T20:00:00-05:00",
  dateShort: "Oct 9",
  lineup: [
    { time: "8:00", act: "A Thousand Feet Per Second" },
    { time: "9:15", act: "Test Pattern" },
    { time: "10:30", act: "Three Men*" },
  ] as ShowSlot[],
};
