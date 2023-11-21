const pelangganDetail = ({ params }: { params: { pelangganId: string } }) => {
  return <div>pelanggan {params.pelangganId}</div>;
};

export default pelangganDetail;
