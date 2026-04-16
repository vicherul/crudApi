import type { ReactNode } from "react";
import behance from "../../assets/behance.svg";
import instagram from "../../assets/instagram.svg";
import linkedin from "../../assets/linkedin.svg";
import { socialLinkClassName, URLS } from "../types/const";


const SocialMedia = () => {
  return (
    <>
      <div className="relative z-3 my-6 flex justify-center gap-4 sm:my-8 sm:gap-5">
        <a
          className={socialLinkClassName}
          href={URLS.Instagram}
          title="Enlace a Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="Instagram" className="w-5 invert" />
        </a>
        <a
          className={socialLinkClassName}
          href={URLS.Behance}
          title="Enlace a Behance"
          target="_blank"
          rel="noreferrer"
        >
          <img src={behance} alt="Behance" className="w-5 invert" />
        </a>
        <a
          className={socialLinkClassName}
          href={URLS.Linkedin}
          title="Enlace a LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedin} alt="LinkedIn" className="w-5 invert" />
        </a>
      </div>
    </>
  );
};

export default SocialMedia;