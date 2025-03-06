import styles from "./styles.module.css";

type Props = {
  priority: number;
};

const PriorityTag = ({ priority }: Props) => {
  return (
    <div
      className={`${styles.priority_tag} ${
        priority == 1
          ? styles.priority_tag_high
          : priority == 2
          ? styles.priority_tag_medium
          : styles.priority_tag_low
      }`}
    >
      {priority == 1 ? (
        <p className={styles.priority_tag_high_text}>High</p>
      ) : priority == 2 ? (
        <p className={styles.priority_tag_medium_text}>Medium</p>
      ) : (
        <p className={styles.priority_tag_low_text}>Low</p>
      )}
    </div>
  );
};

export default PriorityTag;
