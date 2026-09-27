// Band + show metadata, kept separate from the discography data.

export const BAND = {
  name: "A Thousand Feet Per Second",
  domain: "https://fmnogg.in",
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
  dateShort: "Oct 9",
  lineup: [
    { time: "8:00", act: "A Thousand Feet Per Second" },
    { time: "9:15", act: "Test Pattern" },
    { time: "10:30", act: "Three Men*" },
  ] as ShowSlot[],
};
