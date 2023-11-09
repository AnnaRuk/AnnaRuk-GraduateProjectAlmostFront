import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadRequests, rejectRequest } from './RequestsSlice';
import Kindergarten from '../kindergartens/types/Kindergarten';
import { loadKindergartens } from '../kindergartens/KinderdartensSlice';
import Child from '../children/types/Child';

export default function UserRequestsList(): JSX.Element {
  const dispatch = useAppDispatch();
  // const childWithUserList = useAppSelector((state) => state.requests.childWithUserList);
  const requests = useAppSelector((state) => state.requests.requests);
  const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
  const children = useAppSelector((state) => state.children.children);

  useEffect(() => {
    dispatch(loadKindergartens());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadRequests());
  }, [dispatch]);

  function kindergartenTitle(id: number): string {
    const kindergarten: Kindergarten | undefined = kindergartens.find((kita) => kita.id === id);
    if (kindergarten) {
      return kindergarten.title;
    }
    return '';
  }

  function kindergartenAddress(id: number): string {
    const kindergarten: Kindergarten | undefined = kindergartens.find((kita) => kita.id === id);
    if (kindergarten) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${kindergarten.address}, ${kindergarten.postcode}, ${kindergarten.city}`;
    }
    return '';
  }

  function childName(id: number): string {
    const child: Child | undefined = children.find((ch) => ch.id === id);
    if (child) {
      return child.firstName;
    }
    return '';
  }

  function handleRejectRequest(id: number): void {
    dispatch(rejectRequest(id));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>ADDRESS</th>
          <th>CHILD</th>
          <th>STATUS</th>
          <th>REFUSE</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            <td>{kindergartenTitle(request.kindergartenId)}</td>
            <td>{kindergartenAddress(request.kindergartenId)}</td>
            <td>{childName(request.childId)}</td>
            <td>{request.status}</td>
            <td>
              <button type="button" onClick={() => handleRejectRequest(request.id)}>
                del
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
