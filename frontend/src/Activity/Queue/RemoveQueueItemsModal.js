import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Modal from 'Components/Modal/Modal';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './RemoveQueueItemsModal.css';

class RemoveQueueItemsModal extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      blacklist: false,
      skipredownload: false
    };
  }

  //
  // Listeners

  onBlacklistChange = ({ value }) => {
    this.setState({ blacklist: value });
  }

  onSkipReDownloadChange = ({ value }) => {
    this.setState({ skipredownload: value });
  }

  onRemoveQueueItemConfirmed = () => {
    const blacklist = this.state.blacklist;
    const skipredownload = this.state.skipredownload;

    this.setState({
      blacklist: false,
      skipredownload: false
    });
    this.props.onRemovePress(blacklist, skipredownload);
  }

  onModalClose = () => {
    this.setState({
      blacklist: false,
      skipredownload: false
    });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    const {
      isOpen,
      selectedCount
    } = this.props;

    const blacklist = this.state.blacklist;
    const skipredownload = this.state.skipredownload;

    return (
      <Modal
        isOpen={isOpen}
        size={sizes.MEDIUM}
        onModalClose={this.onModalClose}
      >
        <ModalContent
          onModalClose={this.onModalClose}
        >
          <ModalHeader>
            Remove Selected Item{selectedCount > 1 ? 's' : ''}
          </ModalHeader>

          <ModalBody>
            <div className={styles.message}>
              Are you sure you want to remove {selectedCount} item{selectedCount > 1 ? 's' : ''} from the queue?
            </div>

            <FormGroup>
              <FormLabel>Blacklist Release</FormLabel>
              <FormInputGroup
                type={inputTypes.CHECK}
                name="blacklist"
                value={blacklist}
                helpText="Prevents Gamearr from automatically grabbing these files again"
                onChange={this.onBlacklistChange}
              />
            </FormGroup>

            {
              blacklist &&
              <FormGroup>
                <FormLabel>Skip Redownload</FormLabel>
                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="skipredownload"
                  value={skipredownload}
                  helpText="Prevents Gamearr from trying download alternative releases for the removed items"
                  onChange={this.onSkipReDownloadChange}
                />
              </FormGroup>
            }

          </ModalBody>

          <ModalFooter>
            <Button onPress={this.onModalClose}>
              Close
            </Button>

            <Button
              kind={kinds.DANGER}
              onPress={this.onRemoveQueueItemConfirmed}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

RemoveQueueItemsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedCount: PropTypes.number.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default RemoveQueueItemsModal;
