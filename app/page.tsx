"use client";
import Link from "next/link";
import { USUAL_BTN } from "./styles/uni-classes";
import { useDict } from "./utils/useDictHook";
import { useState } from "react";
import PersonCard from "./components/person-card";
import PersonDetailes from "./components/person-details";
import BigPopup from "./components/popup";

export default function Home() {
  const dict = useDict();
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleOpenPersonCard = (index: number | null) => {
    index === isOpen ? setIsOpen(null) : setIsOpen(index);
  };

  return (
    <main className="sm:mx-10">
      <h1 className="text-center uppercase text-2xl my-5 font-bold ">
        {dict.welcomePage}
      </h1>
      <div className="flex flex-col justify-evenly xl:flex-row items-center xl:columns-3 py-3">
        {dict.persons.map((person, index) => (
          <PersonCard
            key={index}
            name={person.name}
            role={person.role}
            photoUrl={person.photoUrl}
            githubUrl={person.githubUrl}
            onClick={() => {
              handleOpenPersonCard(index);
            }}
          />
        ))}
      </div>
      <div className="py-3">
        <div className="block max-[392px]:pt-5 pb-2">
          {dict.welcDesc}
          <span className=" font-bold block">{dict.stack}</span>
          <p>{dict.stackDesc}</p>
          <span className="font-bold ">{dict.coord}</span>
          <p>{dict.coordDesc}</p>
          <span className="font-bold ">{dict.quality}</span>
          <p>{dict.qualityDesc} </p>
        </div>
      </div>
      {isOpen !== null && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(null);
          }}
        >
          <PersonDetailes
            name={dict.persons[isOpen].name}
            role={dict.persons[isOpen].role}
            photoUrl={dict.persons[isOpen].photoUrl}
            githubUrl={dict.persons[isOpen].githubUrl}
            description={dict.persons[isOpen].description}
            contributions={dict.persons[isOpen].contributions}
          />
        </BigPopup>
      )}

      <Link href="/main" className={USUAL_BTN}>
        {dict.mainPage}
      </Link>
    </main>
  );
}
