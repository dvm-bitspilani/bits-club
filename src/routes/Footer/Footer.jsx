import footer from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={footer.container}>
        <div className={footer.DVM}>
          Made with{" "}
            <img src="/assets/heart.svg" alt="love" />
          by DVM
        </div>
        <div className={footer.GDSC}>
            <img src="/assets/gdsc.png" alt="GDSC" />
        </div>
      </div>
    </>
  );
}
