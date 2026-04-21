"use client";

import useTheme from "../Hooks/useTheme";

const SliderToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        .switch {
          font-size: 15px;
          position: relative;
          display: inline-block;
          width: 5em;
          height: 2.5em;
          user-select: none;
        }

        .switch .cb {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle {
          position: absolute;
          cursor: pointer;
          width: 100%;
          height: 100%;
          background-color: #373737 !important;
          border-radius: 0.1em;
          transition: 0.4s;
          text-transform: uppercase;
          font-weight: 700;
          overflow: hidden;
          box-shadow: -0.3em 0 0 0 #373737, -0.3em 0.3em 0 0 #373737,
            0.3em 0 0 0 #373737, 0.3em 0.3em 0 0 #373737, 0 0.3em 0 0 #373737;
        }

        .toggle > .left {
          position: absolute;
          display: flex;
          width: 50%;
          height: 88%;
          background-color: #f3f3f3;
          color: #373737;
          left: 0;
          bottom: 0;
          align-items: center;
          justify-content: center;
          transform-origin: right;
          transform: rotateX(10deg);
          transform-style: preserve-3d;
          transition: all 150ms;
        }

        .left::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(206, 206, 206);
          transform-origin: center left;
          transform: rotateY(90deg);
        }

        .left::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(112, 112, 112);
          transform-origin: center bottom;
          transform: rotateX(90deg);
        }

        .toggle > .right {
          position: absolute;
          display: flex;
          width: 50%;
          height: 88%;
          background-color: #f3f3f3;
          color: rgb(206, 206, 206);
          right: 1px;
          bottom: 0;
          align-items: center;
          justify-content: center;
          transform-origin: left;
          transform: rotateX(10deg) rotateY(-45deg);
          transform-style: preserve-3d;
          transition: all 150ms;
        }

        .right::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(206, 206, 206);
          transform-origin: center right;
          transform: rotateY(-90deg);
        }

        .right::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgb(112, 112, 112);
          transform-origin: center bottom;
          transform: rotateX(90deg);
        }

        /* OFF (ডান পাশে) - ডার্ক মোডে */
        .switch input:not(:checked) + .toggle > .left {
          transform: rotateX(10deg) rotateY(45deg);
          color: rgb(206, 206, 206);
        }

        .switch input:not(:checked) + .toggle > .right {
          transform: rotateX(10deg) rotateY(0deg);
          color: #487bdb;
        }

        /* ON (বাম পাশে) - লাইট মোডে */
        .switch input:checked + .toggle > .left {
          transform: rotateX(10deg) rotateY(0deg);
          color: #373737;
        }

        .switch input:checked + .toggle > .right {
          transform: rotateX(10deg) rotateY(-45deg);
          color: rgb(206, 206, 206);
        }
      `}</style>

      <label className="switch">
        <input
          className="cb"
          type="checkbox"
          checked={!isDark}  // ডার্ক মোডে unchecked (OFF ডান পাশে), লাইট মোডে checked (ON বাম পাশে)
          onChange={() => toggleTheme(isDark ? "light" : "dark")}
        />
        <span className="toggle">
          <span className="left">ON</span>   {/* বাম পাশে ON */}
          <span className="right">OFF</span>  {/* ডান পাশে OFF */}
        </span>
      </label>
    </>
  );
};

export default SliderToggle;