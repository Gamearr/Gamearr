import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getRelativeDate from 'Utilities/Date/getRelativeDate';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import GameBanner from 'Game/GameBanner';
import EditGameModalConnector from 'Game/Edit/EditGameModalConnector';
import DeleteGameModal from 'Game/Delete/DeleteGameModal';
import GameIndexProgressBar from 'Game/Index/ProgressBar/GameIndexProgressBar';
import GameIndexBannerInfo from './GameIndexBannerInfo';
import styles from './GameIndexBanner.css';

class GameIndexBanner extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditArtistModalOpen: false,
      isDeleteArtistModalOpen: false
    };
  }

  //
  // Listeners

  onEditArtistPress = () => {
    this.setState({ isEditArtistModalOpen: true });
  }

  onEditArtistModalClose = () => {
    this.setState({ isEditArtistModalOpen: false });
  }

  onDeleteArtistPress = () => {
    this.setState({
      isEditArtistModalOpen: false,
      isDeleteArtistModalOpen: true
    });
  }

  onDeleteArtistModalClose = () => {
    this.setState({ isDeleteArtistModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      style,
      id,
      artistName,
      monitored,
      status,
      foreignArtistId,
      nextAiring,
      statistics,
      images,
      bannerWidth,
      bannerHeight,
      detailedProgressBar,
      showTitle,
      showMonitored,
      showQualityProfile,
      showSearchAction,
      qualityProfile,
      showRelativeDates,
      shortDateFormat,
      timeFormat,
      isRefreshingArtist,
      isSearchingArtist,
      onRefreshArtistPress,
      onSearchPress,
      ...otherProps
    } = this.props;

    const {
      albumCount,
      sizeOnDisk,
      trackCount,
      trackFileCount,
      totalTrackCount
    } = statistics;

    const {
      isEditArtistModalOpen,
      isDeleteArtistModalOpen
    } = this.state;

    const link = `/artist/${foreignArtistId}`;

    const elementStyle = {
      width: `${bannerWidth}px`,
      height: `${bannerHeight}px`
    };

    return (
      <div className={styles.container} style={style}>
        <div className={styles.content}>
          <div className={styles.bannerContainer}>
            <Label className={styles.controls}>
              <SpinnerIconButton
                className={styles.action}
                name={icons.REFRESH}
                title="Refresh Artist"
                isSpinning={isRefreshingArtist}
                onPress={onRefreshArtistPress}
              />

              {
                showSearchAction &&
                  <SpinnerIconButton
                    className={styles.action}
                    name={icons.SEARCH}
                    title="Search for monitored albums"
                    isSpinning={isSearchingArtist}
                    onPress={onSearchPress}
                  />
              }

              <IconButton
                className={styles.action}
                name={icons.EDIT}
                title="Edit Artist"
                onPress={this.onEditArtistPress}
              />
            </Label>

            {
              status === 'ended' &&
                <div
                  className={styles.ended}
                  title="Ended"
                />
            }

            <Link
              className={styles.link}
              style={elementStyle}
              to={link}
            >
              <GameBanner
                className={styles.banner}
                style={elementStyle}
                images={images}
                size={70}
                lazy={false}
                overflow={true}
              />
            </Link>
          </div>

          <GameIndexProgressBar
            monitored={monitored}
            status={status}
            trackCount={trackCount}
            trackFileCount={trackFileCount}
            totalTrackCount={totalTrackCount}
            posterWidth={bannerWidth}
            detailedProgressBar={detailedProgressBar}
          />

          {
            showTitle &&
              <div className={styles.title}>
                {artistName}
              </div>
          }

          {
            showMonitored &&
              <div className={styles.title}>
                {monitored ? 'Monitored' : 'Unmonitored'}
              </div>
          }

          {
            showQualityProfile &&
              <div className={styles.title}>
                {qualityProfile.name}
              </div>
          }
          {
            nextAiring &&
              <div className={styles.nextAiring}>
                {
                  getRelativeDate(
                    nextAiring,
                    shortDateFormat,
                    showRelativeDates,
                    {
                      timeFormat,
                      timeForToday: true
                    }
                  )
                }
              </div>
          }

          <GameIndexBannerInfo
            albumCount={albumCount}
            sizeOnDisk={sizeOnDisk}
            qualityProfile={qualityProfile}
            showQualityProfile={showQualityProfile}
            showRelativeDates={showRelativeDates}
            shortDateFormat={shortDateFormat}
            timeFormat={timeFormat}
            {...otherProps}
          />

          <EditGameModalConnector
            isOpen={isEditArtistModalOpen}
            artistId={id}
            onModalClose={this.onEditArtistModalClose}
            onDeleteArtistPress={this.onDeleteArtistPress}
          />

          <DeleteGameModal
            isOpen={isDeleteArtistModalOpen}
            artistId={id}
            onModalClose={this.onDeleteArtistModalClose}
          />
        </div>
      </div>
    );
  }
}

GameIndexBanner.propTypes = {
  style: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  foreignArtistId: PropTypes.string.isRequired,
  nextAiring: PropTypes.string,
  statistics: PropTypes.object.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  bannerWidth: PropTypes.number.isRequired,
  bannerHeight: PropTypes.number.isRequired,
  detailedProgressBar: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showMonitored: PropTypes.bool.isRequired,
  showQualityProfile: PropTypes.bool.isRequired,
  qualityProfile: PropTypes.object.isRequired,
  showSearchAction: PropTypes.bool.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  isRefreshingArtist: PropTypes.bool.isRequired,
  isSearchingArtist: PropTypes.bool.isRequired,
  onRefreshArtistPress: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

GameIndexBanner.defaultProps = {
  statistics: {
    albumCount: 0,
    trackCount: 0,
    trackFileCount: 0,
    totalTrackCount: 0
  }
};

export default GameIndexBanner;
