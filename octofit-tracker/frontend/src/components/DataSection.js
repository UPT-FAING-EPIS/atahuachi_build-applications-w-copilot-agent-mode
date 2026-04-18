import React, { useEffect, useMemo, useState } from 'react';

const getApiBaseUrl = () => {
  if (process.env.REACT_APP_CODESPACE_NAME) {
    return `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

const formatCellValue = (value) => {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

const buildColumns = (records) => {
  const keyMap = new Set();

  records.slice(0, 10).forEach((item) => {
    Object.keys(item || {}).forEach((key) => keyMap.add(key));
  });

  const keys = Array.from(keyMap);
  keys.sort((a, b) => {
    if (a === 'id') {
      return -1;
    }
    if (b === 'id') {
      return 1;
    }
    return a.localeCompare(b);
  });

  return keys.slice(0, 6);
};

const DataSection = ({ title, endpointPath, endpoint, subtitle }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const resolvedEndpoint = endpoint || `${getApiBaseUrl()}${endpointPath}`;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(resolvedEndpoint, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const json = await response.json();
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Could not load data from the API endpoint.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [resolvedEndpoint]);

  const columns = useMemo(() => buildColumns(data), [data]);

  const filteredData = useMemo(() => {
    if (!query.trim()) {
      return data;
    }

    const queryLower = query.toLowerCase();
    return data.filter((item) => JSON.stringify(item).toLowerCase().includes(queryLower));
  }, [data, query]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 pt-4 px-4">
        <h2 className="h3 mb-1">{title}</h2>
        <p className="text-secondary mb-0">{subtitle}</p>
      </div>

      <div className="card-body px-4">
        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-8">
            <label htmlFor={`${title}-search`} className="form-label">Filter records</label>
            <input
              id={`${title}-search`}
              type="search"
              className="form-control"
              placeholder="Search in current data"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-6 col-md-2 d-flex align-items-end">
            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => setQuery('')}>
              Clear
            </button>
          </div>
          <div className="col-6 col-md-2 d-flex align-items-end">
            <button type="button" className="btn btn-primary w-100" onClick={() => setQuery(query.trim())}>
              Apply
            </button>
          </div>
        </form>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <a className="btn btn-link px-0 link-primary" href={resolvedEndpoint} target="_blank" rel="noreferrer">
            Open API endpoint
          </a>
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setSelectedItem(null)}>
            Reset modal
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle table-consistent mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col" style={{ width: '72px' }}>#</th>
                {columns.map((column) => (
                  <th scope="col" key={column}>{column}</th>
                ))}
                <th scope="col" style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={columns.length + 2}>Loading data...</td>
                </tr>
              )}

              {!isLoading && filteredData.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2}>No records found.</td>
                </tr>
              )}

              {!isLoading && filteredData.map((item, index) => (
                <tr key={item.id || `${title}-${index}`}>
                  <th scope="row">{index + 1}</th>
                  {columns.map((column) => (
                    <td key={`${item.id || index}-${column}`}>{formatCellValue(item[column])}</td>
                  ))}
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => setSelectedItem(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} record details</h3>
                  <button type="button" className="btn-close" onClick={() => setSelectedItem(null)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </section>
  );
};

export default DataSection;