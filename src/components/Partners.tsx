import bicLogo from "@/assets/logos/bic.png";
import bioCarbonLogo from "@/assets/logos/biocarbon.png";
import ctxLogo from "@/assets/logos/ctx.png";
import dthLogo from "@/assets/logos/dth.png";
import mastercardLogo from "@/assets/logos/mastercard.png";
import stripeLogo from "@/assets/logos/stripe.png";
import verraLogo from "@/assets/logos/verra.png";
import visaLogo from "@/assets/logos/visa.png";

const logos = [
  bicLogo,
  bioCarbonLogo,
  ctxLogo,
  dthLogo,
  mastercardLogo,
  stripeLogo,
  verraLogo,
  visaLogo,
];

const OurPartners = () => {
  return (
    <section className="w-full py-12">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
        Our Partners
      </h3>

      <div className="overflow-hidden w-full">
        <div className="animate-scroll flex items-center gap-20 whitespace-nowrap px-8">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Partner ${index + 1}`}
              className="h-10 md:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default OurPartners;
