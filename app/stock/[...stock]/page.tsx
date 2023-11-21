const stockDetail = ({ params }: { params: { stockId: string } }) => {
  return <div>stock {params.stockId}</div>;
};

export default stockDetail;
