import Image from "next/image";

export default function WorkIntro() {
  return (
    <section className="work-intro">
      <div className="work-heads">
        <h1 className="w-head w-head-up">Featured</h1>
        <div className="work-heads-row">
          <h2 className="w-head w-head-down">
            <span className="span">W</span>
            <span className="f-span space">o</span>rk
          </h2>
          <Image
            src="/images/stamp.png"
            alt=""
            width={288}
            height={359}
            className="work-stamp"
          />
        </div>
      </div>
      <p className="work-lead has-dropcap-vh">
        As an artisan, I like to start from raw matter and give life to an
        iconic product that makes your brand stand out – starting from a Visual
        Strategy that guide the client’s vision to reality.
      </p>
    </section>
  );
}
