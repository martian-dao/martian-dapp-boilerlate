import "./index.css";
import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { useAuth } from "../../context/auth";

function Connect() {
  const { setAuthAccount } = useAuth();

  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  const handleConnect = () => {
    window.martian
      .connect()
      .then((resp: any) => {
        if (resp.status === 200) {
          setAuthAccount({ address: resp.address });
        } else if (resp.status === 4001) {
          notification.open({
            message: "User denied request to connect to this website!",
          });
        }
      })
      .catch((err: any) => {
        console.error(err);
        notification.error({
          message: err.message || err,
        });
      });
  };

  useEffect(() => {
    if ("martian" in window) {
      setIsWalletInstalled(true);
    } else {
      setIsWalletInstalled(false);
    }
  }, []);

  window.addEventListener("martian_wallet_injected", (event) => {
    setIsWalletInstalled(true);
  });

  return (
    <div className="connect">
      <Button
        className="connect-btn"
        disabled={!isWalletInstalled}
        onClick={handleConnect}
      >
        Connect Martian
      </Button>
    </div>
  );
}

export default Connect;
