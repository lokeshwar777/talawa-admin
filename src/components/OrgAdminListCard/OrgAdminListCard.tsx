import React from 'react';
import styles from './OrgAdminListCard.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalResponse from 'components/Response/ModalResponse';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@apollo/client';

// import { ApolloProvider } from '@apollo/react-hooks';
import { REMOVE_ADMIN_MUTATION } from 'GraphQl/Mutations/mutations';
interface OrgPeopleListCardProps {
  key: string;
  id: string;
  memberName: string;
  memberLocation: string;
  joinDate: string;
  memberImage: string;
}
const currentUrl = window.location.href.split('=')[1];

function OrgAdminListCard(props: OrgPeopleListCardProps): JSX.Element {
  const [remove] = useMutation(REMOVE_ADMIN_MUTATION);

  const [modalNotification, setModalNotification] = React.useState(false);
  const [notificationText, setNotificationText] = React.useState('');

  const RemoveAdmin = async () => {
    console.log(currentUrl);
    console.log(props.id);
    try {
      const { data } = await remove({
        variables: {
          userid: props.id,
          orgid: currentUrl,
        },
      });
      console.log(data);
      toast.success('Admin is removed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error('User is not authorized for performing this operation', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const ConfirmationHandler = () => {
    setModalNotification(true);
    setNotificationText('Are you sure you want to Remove Admin');
  };

  const ContinueHandler = () => {
    RemoveAdmin();
    setModalNotification(false);
    setNotificationText('');
  };

  const CloseHandler = () => {
    setModalNotification(false);
    setNotificationText('');
  };

  return (
    <>
      <ToastContainer />
      <ModalResponse
        show={modalNotification}
        message={notificationText}
        handleClose={CloseHandler}
        handleContinue={ContinueHandler}
      />
      <div className={styles.peoplelistdiv}>
        <Row className={styles.memberlist}>
          {props.memberImage ? (
            <img src={props.memberImage} className={styles.alignimg} />
          ) : (
            <img
              src="https://via.placeholder.com/200x100"
              className={styles.memberimg}
            />
          )}
          <Col className={styles.singledetails}>
            <div className={styles.singledetails_data_left}>
              <p className={styles.membername}>
                {props.memberName ? (
                  <p>{props.memberName}</p>
                ) : (
                  <p>Dogs Care</p>
                )}
              </p>
              <p className={styles.memberfont}>
                <span>{props.memberLocation}</span>
              </p>
              <p className={styles.memberfontcreated}>saumya47999@gmail.com</p>
            </div>
            <div className={styles.singledetails_data_right}>
              <p className={styles.memberfont}>
                Joined: <span>{props.joinDate}</span>
              </p>
              <button
                className={styles.memberfontcreatedbtn}
                onClick={ConfirmationHandler}
              >
                Remove
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <hr></hr>
    </>
  );
}
export {};
export default OrgAdminListCard;