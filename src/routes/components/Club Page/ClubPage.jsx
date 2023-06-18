import { useParams } from "react-router-dom";

export default function ClubPage() {

    const clubName = useParams().club

  return (
    <div className="container">
      <h1 className="mt-4">Club Page</h1>
        <h3>Welcome to {clubName}</h3>
    </div>
  );
}
