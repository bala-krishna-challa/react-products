import React from "react";
import { useState } from "react";
import { useTransition } from "react";
import { memo } from "react";

function ContactTab() {
  return (
    <>
      <p>You can find me online here:</p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
}

const PostsTab = memo(function PostsTab() {
  // Log once. The actual slowdown is inside SlowPost.
  console.log("[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />");

  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return <ul className="items">{items}</ul>;
});

function SlowPost({ index }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 2) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Post #{index + 1}</li>;
}

function AboutTab() {
  return <p>Welcome to my profile!</p>;
}

function TabButton({ children, isActive, onClick }) {
  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default function UsingTransition() {
  const [_, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === "contact"}
        onClick={() => selectTab("contact")}
      >
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}
