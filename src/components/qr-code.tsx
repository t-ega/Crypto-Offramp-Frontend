type QrCodeProps = {
  data: string;
};

const QrCode = (props: QrCodeProps) => {
  const { data } = props;
  return <div className="qr-code"></div>;
};

export default QrCode;
