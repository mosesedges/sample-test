import { Card, type CardProps } from "./component/Card";
import "./App.css";
import { Suspense, useState } from "react";
import { SearchBox } from "./utils/Search";

const contributions: CardProps[] = [
  {
    id: 17,
    title: "Detective Diaries",
    description: "Follow the journey of detectives solving mysterious cases.",
    startTime: "2024-05-27T21:00:00Z",
    endTime: "2024-05-27T22:00:00Z",
    owner: "MysteryMakers Studio",
  },
  {
    id: 27,
    title: "Crime Scene Investigations",
    description: "A closer look at real-life crime scene investigations.",
    startTime: "2024-05-27T21:00:00Z",
    endTime: "2024-05-27T22:00:00Z",
    owner: "MysteryMakers Studio",
  },
  {
    id: 37,
    title: "Mystery Theater",
    description:
      "A classic mystery film followed by a discussion with experts.",
    startTime: "2024-05-27T22:00:00Z",
    endTime: "2024-05-27T23:30:00Z",
    owner: "MysteryMakers Studio",
  },
  {
    id: 47,
    title: "Classic Mystery Marathon",
    description: "Back-to-back episodes of classic mystery TV shows.",
    startTime: "2024-05-27T22:00:00Z",
    endTime: "2024-05-28T01:00:00Z",
    owner: "MysteryMakers Studio",
  },
];

const localizedDate = ({ date }: { date: string }) => {
  const userLocale = navigator.language ?? "en-uk";

  return new Intl.DateTimeFormat(userLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const localeTime = (data: string) => data.substring(11, 19);

function App() {
  return (
    <div>
      <SearchBox data={contributions} />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 m-4 p-4">
        <Suspense fallback={"Loading ..."}>
          {contributions.map((item: CardProps) => {
            const { id, title, description, owner, startTime, endTime } = item;
            const localeStartTime = localizedDate({ date: startTime });
            const localeEndTime = localizedDate({ date: endTime });
            const formattedStartTime = localeTime(startTime);
            const formattedEndTime = localeTime(endTime);
            return (
              <div key={id}>
                <Card
                  title={title}
                  description={description}
                  startTime={formattedStartTime}
                  endTime={
                    formattedStartTime === formattedEndTime
                      ? ""
                      : formattedEndTime
                  }
                  owner={owner}
                  showStatus="completed"
                  startDate={localeStartTime}
                  endDate={
                    localeStartTime === localeEndTime ? "" : localeEndTime
                  }
                />
              </div>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
