type TableSkeletonProps = {
  columnsCount: number;
  rows?: number;
  minColumns?: number;
};

export default function TableSkeleton({
  columnsCount,
  rows = 8,
  minColumns = 3,
}: TableSkeletonProps) {
  const cols = Math.max(minColumns, columnsCount);

  return (
    <div className="px-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="placeholder-glow" style={{ width: 220 }}>
          <span className="placeholder col-12" />
        </div>
        <div className="placeholder-glow" style={{ width: 260 }}>
          <span className="placeholder col-12" />
        </div>
      </div>

      <div className="table-responsive">
        <table
          id="basic-datatable-skeleton"
          className="table table-bordered dt-responsive nowrap w-100 mb-0"
        >
          <thead className="table-light">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i}>
                  <span className="placeholder-glow">
                    <span className="placeholder col-8" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((__, c) => (
                  <td key={c}>
                    <span className="placeholder-glow">
                      <span className="placeholder col-10" />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <div className="placeholder-glow" style={{ width: 240 }}>
          <span className="placeholder col-12" />
        </div>
      </div>
    </div>
  );
}
