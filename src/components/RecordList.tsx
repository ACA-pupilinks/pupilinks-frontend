import React, { useEffect, useState } from 'react';
import { getRecords, Record, RecordsResponse } from '../services/pocketbase';

const RecordList: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: RecordsResponse = await getRecords('location', page, 10);
      setRecords(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Location Records</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {/* Adjust this based on your actual record structure */}
              {record.name || `Record ${record.id}`}
            </li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RecordList;