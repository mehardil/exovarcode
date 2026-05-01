import React from "react";
import { work } from "../data/content";
import { SectionIntro } from "../components/SectionIntro";

export function Work() {
  return (
    <>
      <SectionIntro
        label="Work"
        title="Useful builds for teams that need momentum."
        text="A sample of the kind of systems XoCODE can design, develop, launch, and improve."
      />
      <section className="work-grid wrap">
        {work.map((item) => (
          <article className="work-card" key={item.title}>
            <img src={item.image} alt="" />
            <div>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
