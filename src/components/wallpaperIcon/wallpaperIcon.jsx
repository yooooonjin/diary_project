import React from 'react';
import styles from './wallpaperIcon.module.css';

const WallpaperIcon = ({ wallpaperIcon, location }) => {
  return (
    <div
      className={`${styles.icon_container} ${
        location === 'right' ? styles.rigthSide : styles.leftSide
      }`}
    >
      {wallpaperIcon &&
        wallpaperIcon.map((icon) => {
          return (
            <div key={icon.name} className={styles.iconPiece}>
              <img
                onClick={icon.onClick}
                id={icon.name}
                className={styles.icon}
                src={process.env.PUBLIC_URL + icon.src}
              />
              <p className={styles.iconName}>{icon.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default WallpaperIcon;
