import "../css/infrastructure.css";
import blueobj from "/images/infrastructure/blue_infra.avif";
import orangeobj from "/images/infrastructure/orange_infra.avif";
import classroom from "/images/infrastructure/classroom_infra.avif";
import seminar from "/images/infrastructure/seminarhall_infra.avif";
import library from "/images/infrastructure/library_infra.avif";
import playground from "/images/infrastructure/playground_infra.avif";
import cultural from "/images/infrastructure/cultural_infra.avif";
import healthcare from "/images/infrastructure/healthcare_infra.avif";
import hostel from "/images/infrastructure/hostel_infra.avif";
import canteen from "/images/infrastructure/canteen_infra.avif";
import socialinitiatives from "/images/infrastructure/socialinitiatives_infra.avif";
import { FaQuoteLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const infrastructure = [
  {
    image1: classroom,
    blueobj1: blueobj,
    orangeobj1: orangeobj,
    title1: "Smart Class Room",
    odd_id: "1",
    paragraph1:
      "Well-equipped and spacious classrooms at UCAS foster an engaging and interactive learning environment. With modern teaching aids like LCD projectors and OHPs, the classrooms are designed to enhance knowledge delivery. ",
    quote1: "Smart Classes, Brighter Futures: Learning Today, Leading Tomorrow",
  },
  {
    image2: seminar,
    blueobj2: blueobj,
    orangeobj2: orangeobj,
    title2: "Seminar Hall",
    even_id: "2",
    paragraph2:
      "UCAS's seminar hall is a hub for intellectual discussions, presentations, and workshops. It provides students with opportunities to present research papers, prepare projects, and interact with industry leaders.",
    quote2:
      "Ideas Ignite: Seminar Halls for Thoughtful Conversations and Growth",
  },
  {
    image1: library,
    blueobj1: blueobj,
    orangeobj1: orangeobj,
    title1: "Library",
    odd_id: "3",
    paragraph1:
      "The UCAS library is a treasure trove of knowledge, offering a vast collection of national and international journals, books, periodicals, and magazines. With internet facilities and continual updates, the library is a sanctuary for students to expand their horizons and deepen their understanding.",
    quote1: "A World of Knowledge Awaits: Libraries Open Minds, Fuel Dreams.",
  },
  {
    image2: playground,
    blueobj2: blueobj,
    orangeobj2: orangeobj,
    title2: "Play Ground",
    even_id: "4",

    paragraph2:
      "UCAS promotes holistic development through various sports and extracurricular activities. The college playground is a space where students can enjoy physical activities, participate in intercollegiate competitions, and develop team spirit and sportsmanship. ",
    quote2: "Playgrounds: Where Fun Fuels Growth and Strength.",
  },
  {
    image1: cultural,
    blueobj1: blueobj,
    orangeobj1: orangeobj,
    title1: "Cultural",
    odd_id: "5",
    paragraph1:
      "UCAS encourages students to explore their artistic talents through cultural clubs. Whether it’s music, dance, drama, or visual arts, these clubs offer workshops and events that celebrate creativity and diversity, helping students express themselves and build lasting memories.",
    quote1: "Embracing Diversity, Celebrating Culture, Connecting Hearts",
  },
  {
    image2: healthcare,
    blueobj2: blueobj,
    orangeobj2: orangeobj,
    title2: "Health Centre",
    even_id: "6",

    paragraph2:
      "The health and well-being of students are a priority at UCAS. Regular health check-ups and a well-equipped medical room ensure students remain fit and healthy, providing peace of mind to focus on their academics and personal growth.",
    quote2: "Nurturing Health, Inspiring Growth: The Heart of Campus",
  },
  {
    image1: hostel,
    blueobj1: blueobj,
    orangeobj1: orangeobj,
    title1: "Hostel",
    odd_id: "7",
    paragraph1:
      "UCAS offers separate hostel facilities for boys and girls with comfortable and well-furnished rooms. The hostels provide an environment conducive to academic and personal growth, fostering community living and out-of-class interactions that shape well-rounded personalities.",
    quote1: "Comfort, Community, and Convenience: The Heart of Hostel Life!",
  },
  {
    image2: canteen,
    blueobj2: blueobj,
    orangeobj2: orangeobj,
    title2: "Cafeteria",
    even_id: "8",

    paragraph2:
      "The UCAS cafeteria is a lively space where students can unwind, socialize, and enjoy a wide variety of delicious and nutritious meals. It’s more than just a place to eat; it’s where friendships are forged over shared experiences.",
    quote2: "Fueling Minds, Friendship and Community: College Cafeterias",
  },
  {
    image1: socialinitiatives,
    blueobj1: blueobj,
    orangeobj1: orangeobj,
    title1: "Students Social Initiatives",
    odd_id: "9",
    paragraph1:
      "UCAS empowers students to lead social initiatives that positively impact the community. Through collaborative efforts, students tackle local and global challenges, demonstrating their commitment to creating a better world.",
    quote1: "Empowering Change: Together We Build a Better Tomorrow!",
  },
];

const InfrastructureCards = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const windowHeight = window.innerHeight;
        const elementHeight = targetElement.offsetHeight;
        const scrollToPosition = offsetTop - (windowHeight - elementHeight) / 2;
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main className="infrastructurecards_container container">
      <div className="infrastructurecards_component">
        {infrastructure.map((item, index) => (
          <div
            key={`card-${index}`}
            className={`infrastructurecards_card ${index % 2 === 0 ? "odd" : "even"
              }`}
          >
            {item.image1 && (
              <div className="infrastructurecards_cardodd" id={item.odd_id}>
                <div className="infrastructurecards_imageodd">
                  <div className="infrastructurecards_imgodd">
                    <div className="infracard_shadow">
                      <img
                        className="infracard_imgodd"
                        src={item.image1}
                        alt={item.title1}
                      />
                    </div>
                    <div className="infrastructurecards_objodd">
                      <img
                        className="infracard_objoddblue"
                        src={item.blueobj1}
                        alt=""
                      />
                      <img
                        className="infracard_objoddorg"
                        src={item.orangeobj1}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="infrastructurecards_contentodd">
                  <div className="infrastructurecards_paraodd">
                    <h2 className="infracard_title">{item.title1}</h2>
                    <p className="infracard_paraodd para">{item.paragraph1}</p>
                  </div>
                  <div
                    className="infrastructurecards_designodd"
                    data-aos="fade-left"
                    data-aos-delay="100"
                  >
                    <p className="infracard_quoteodd">
                      <sup className="infraquote_designoddone">
                        <sup>
                          <FaQuoteLeft />
                        </sup>
                      </sup>
                      &nbsp;&nbsp;{item.quote1}&nbsp;&nbsp;
                      <sub className="infraquote_designoddtwo">
                        <sub className="quote-iconodd">
                          <FaQuoteLeft style={{ transform: "scaleX(-1)" }} />
                        </sub>
                      </sub>
                    </p>
                  </div>
                </div>
              </div>
            )}
            {item.image2 && (
              <div className="infrastructurecards_cardeven" id={item.even_id}>
                <div className="infrastructurecards_contenteven">
                  <div className="infrastructurecards_paraeven">
                    <h2 className="infracard_title">{item.title2}</h2>
                    <p className="infracard_paraeven para">{item.paragraph2}</p>
                  </div>
                  <div
                    className="infrastructurecards_designeven"
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <p className="infracard_quoteeven">
                      <sup className="infraquote_designevenone">
                        <sup>
                          <FaQuoteLeft />
                        </sup>
                      </sup>
                      &nbsp;&nbsp;{item.quote2}&nbsp;&nbsp;
                      <sub className="infraquote_designeventwo">
                        <sub className="quote-iconeven">
                          <FaQuoteLeft style={{ transform: "scaleX(-1)" }} />
                        </sub>
                      </sub>
                    </p>
                  </div>
                </div>
                <div className="infrastructurecards_imageeven">
                  <div className="infrastructurecards_imgeven">
                    <div className="infracard_shadow">
                      <img
                        className="infracard_imgeven"
                        src={item.image2}
                        alt={item.title2}
                      />
                    </div>
                    <div className="infrastructurecards_objeven">
                      <img
                        className="infracard_objevenblue"
                        src={item.blueobj2}
                        alt=""
                      />
                      <img
                        className="infracard_objevenorg"
                        src={item.orangeobj2}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default InfrastructureCards;
