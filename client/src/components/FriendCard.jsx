import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return <div className="card bg-base-200 hover:shadow-md transition-shadow">
    <div className="card-body p-4">
        {/* User Info */}
    </div>
  </div>;
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
