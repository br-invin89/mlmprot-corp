import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Row, Col, Button, Input, Typography } from "antd";
import { callGetApi } from "utils/api";

export default function EnrollerModal(props) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const referer = useSelector((state) => state.mlm.referer);
  const defaultReferer = useSelector((state) => state.mlm.defaultReferer);
  const [selectedReferer, setSelectedReferer] = useState(undefined);
  const [savingReferer, setSavingReferer] = useState(undefined);
  const [suggestingReferers, setSuggestingReferers] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    if (!defaultReferer) return;
    if (referer) {
      setSelectedReferer(referer);
    } else {
      setSelectedReferer(defaultReferer);
    }
  }, [defaultReferer]);

  const onSearchType = (v) => {
    setSearchParam(v);
    setSuggestingReferers([]);
    if (v == "") return;

    callGetApi(`suggest_enrollees/${v}`, onGetSuggestingEnrollees);
  };
  const onGetSuggestingEnrollees = (data) => {
    setSuggestingReferers(data.data);
  };
  const onSelectReferer = (referer) => {
    setSuggestingReferers([]);
    setSavingReferer(referer);
  };
  const onSave = () => {
    if (savingReferer) {
      dispatch({
        type: "FETCH_ENROLLEE_SUCCESS",
        payload: { data: savingReferer },
      });
    }
    props.onClose();
  };

  return (
    <Modal visible={true} footer={null} onCancel={props.onClose} width={300}>
      {!isEditing ? (
        <div className="">
          {selectedReferer &&
            (selectedReferer?.show_contact_info === 2 ? (
              <>
                <Row justify="space-between">
                  <Col>
                    <label>Your Enroller:</label>
                  </Col>
                  <Col>
                    {selectedReferer.first_name +
                      " " +
                      selectedReferer.last_name}
                  </Col>
                </Row>
              </>
            ) : (
              <div>
                <div
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: 550,
                  }}
                >
                  Your Enroller:
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
                      src={selectedReferer?.image || '/images/nophoto.jpg'}
                    />
                  </div>
                  <div
                    style={{
                      color: "black",
                      marginLeft: "17px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      {selectedReferer?.first_name +
                        " " +
                        selectedReferer?.last_name}
                    </div>
                    <div>{selectedReferer?.email}</div>
                    <div>{selectedReferer?.phone}</div>
                  </div>
                </div>
              </div>
            ))}
          <Row justify="start">
            {/*
            <Col>
              <Button
                onClick={()=>setIsEditing(true)}
              >
                Change
              </Button> 
            </Col>
            */}
          </Row>
        </div>
      ) : (
        <div className="">
          {savingReferer && (
            <>
              <Row justify="space-between">
                <Col>
                  <label>Name:</label>
                </Col>
                <Col>
                  {savingReferer.first_name + " " + savingReferer.last_name}
                </Col>
              </Row>
              <Row justify="space-between">
                <Col>
                  <label>Username:</label>
                </Col>
                <Col>{savingReferer.username}</Col>
              </Row>
            </>
          )}
          <div className="user-search-form">
            <p>Please search your referer.</p>
            <Input
              type="text"
              value={searchParam}
              onChange={(e) => onSearchType(e.target.value)}
            />
            {suggestingReferers.length > 0 && (
              <div className="suggestion-tips">
                {suggestingReferers.map((referer) => (
                  <Row
                    onClick={() => onSelectReferer(referer)}
                    justify="space-between"
                    className="suggesting-referer"
                  >
                    <Col>
                      <Typography.Text type="secondary">
                        {referer.first_name + " " + referer.last_name}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text type="secondary">
                        <em>Username: </em>
                        {referer.username}
                      </Typography.Text>
                    </Col>
                  </Row>
                ))}
              </div>
            )}
            <Row justify="space-between" style={{ marginTop: 12 }}>
              <Col>
                <Button onClick={onSave} type="primary">
                  Save
                </Button>
              </Col>
              <Col>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </Col>
            </Row>
          </div>
        </div>
      )}
      <style jsx>{`
        .user-search-form {
          position: relative;
        }
        .suggestion-tips {
          position: absolute;
          left: 0;
          top: 68px;
          width: 100%;
          cursor: pointer;
          z-index: 35;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 10px;
        }
      `}</style>
    </Modal>
  );
}
