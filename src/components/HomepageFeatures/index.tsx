import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  //Svg: React.ComponentType<React.ComponentProps<"svg">>;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Fast",
    image: "/FutureOfdentity.png",
    description: (
      <>Zero Wait, Full Privacy: Accelerate Your zkApps in the Cloud</>
    ),
  },
  {
    title: "Proving",
    image: "/lock.png",
    description: (
      <>
        {" "}
        Instant Proofs, Infinite Possibilities: Empower Your zkApps with Speed
        and Security
      </>
    ),
  },
  {
    title: "Service",
    image: "/art.png",
    description: (
      <>Fast, Secure, Scalable: The Future of zkApps Proving in the Cloud</>
    ),
  },
  /*
  {
    title: "Focus on What Matters",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: "Powered by React",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  */
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} src={"/img" + image} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
