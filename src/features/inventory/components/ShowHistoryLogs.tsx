import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchHistoryById } from "../inventoryThunk";
import type { AppDispatch, RootState } from "../../../store";
import { timeAgoForStock } from "../../../helper";
import {
  BackIcon,
  BackLink,
} from "../../products/components/ProductDetailsStyles";
const ShowHistoryLogs = () => {
  const { id } = useParams(); // route like /inventory/:id/history
  const dispatch = useDispatch<AppDispatch>();

  const { history, historyLoading, historyError } = useSelector(
    (state: RootState) => state.inventory,
  );

  useEffect(() => {
    if (id) dispatch(fetchHistoryById(Number(id)));
  }, [dispatch, id]);

  if (historyLoading) return <>Loading history...</>;
  if (historyError) return <>{historyError}</>;
  if (!history.length) return <>No history found</>;

  return (
    <div>
      <BackLink to="/inventory">
        <BackIcon>←</BackIcon>
        Back to Inventory
      </BackLink>
      <h3>Stock History</h3>
      <ul>
        {history.map((h) => (
          <li key={h.id}>
            {h.reason}
            <h3>Previous Stock: {h.previousStock}</h3>
            <h4>New stock: {h.newStock}</h4>
            <p> Time: {timeAgoForStock(h.timestamp)}</p>
            <p>Time stamp {h.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowHistoryLogs;
