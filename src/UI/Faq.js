import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import "./Faq.css";

const faqs = [
  {
    uuid: "1a1b",
    heading: "Is this website really free?",
    content:
      "Yes, Currently all features are free, easy and available to groups of all kinds.",
  },
  {
    uuid: "2a2b",
    heading: "How to change my region from India",
    content:
      "Sorry, Currently it is not possible to change region. But our team is working on it.",
  },
  {
    uuid: "3a3b",
    heading: "How to reset my password?",
    content:
      "Reseting password is currently not supported. Try to remember, We believe on you. It can be your name, mobile number or your crush's name. Otherwise, Signup is always available",
  },
  {
    uuid: "4a4b",
    heading: "I didn't signed up but still my email is showing registered",
    content:
      "Sorry to hear that. We believe among us there is a impostor and we cant do anything about this. All we can say is to use another email id",
  },
  {
    uuid: "5a5b",
    heading: "Can I download movies and tv series from this website",
    content: "We wish, You could. But it is not possible right now",
  },
  {
    uuid: "6a6b",
    heading: "Can I add same movie or tv series to both watchlist and watched?",
    content: "Right now this is not possible",
  },
  {
    uuid: "7a7b",
    heading: "Is my data secure?",
    content:
      "Protecting our users data is our number one priority and always will be",
  },
  {
    uuid: "8a8b",
    heading:
      "I want to use user specific feature, but I don't want to signup. Is it possible?",
    content:
      "Signup is easy and free. Do try it. But still if you insists, email: weloveyou@scarlett.com and password: loveScarlett",
  },
];

const Faq = () => {
  return (
    <div className="faq-section">
      <h3>F.A.Q</h3>
      <Accordion allowZeroExpanded>
        {faqs.map((faq) => (
          <AccordionItem key={faq.uuid}>
            <AccordionItemHeading>
              <AccordionItemButton>{faq.heading}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>{faq.content}</AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
