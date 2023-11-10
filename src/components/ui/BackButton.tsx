import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button style="back" type="button" onClick={() => navigate(-1)}>
      &larr; back
    </Button>
  );
}
