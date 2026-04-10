export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  searchAliases?: string[];
}

export const VISA_COUNTRIES: Country[] = [
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971", searchAliases: ["UAE", "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Emirates"] },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966", searchAliases: ["KSA", "Riyadh", "Jeddah", "Mecca", "Medina"] },
  { code: "QA", name: "Qatar", flag: "🇶🇦", dialCode: "+974", searchAliases: ["Doha"] },
  { code: "OM", name: "Oman", flag: "🇴🇲", dialCode: "+968", searchAliases: ["Muscat"] },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", dialCode: "+965", searchAliases: ["Kuwait City"] },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", dialCode: "+973", searchAliases: ["Manama"] },
  { code: "JO", name: "Jordan", flag: "🇯🇴", dialCode: "+962", searchAliases: ["Amman", "Petra"] },
  { code: "IL", name: "Israel", flag: "🇮🇱", dialCode: "+972", searchAliases: ["Tel Aviv", "Jerusalem"] },
  { code: "LB", name: "Lebanon", flag: "🇱🇧", dialCode: "+961", searchAliases: ["Beirut"] },
  { code: "IQ", name: "Iraq", flag: "🇮🇶", dialCode: "+964", searchAliases: ["Baghdad", "Karbala", "Najaf"] },
  { code: "IR", name: "Iran", flag: "🇮🇷", dialCode: "+98", searchAliases: ["Tehran", "Persia"] },
  { code: "YE", name: "Yemen", flag: "🇾🇪", dialCode: "+967", searchAliases: ["Sanaa"] },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1", searchAliases: ["USA", "America", "New York", "Los Angeles", "US", "United States of America"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1", searchAliases: ["Toronto", "Vancouver", "Montreal"] },
  { code: "MX", name: "Mexico", flag: "🇲🇽", dialCode: "+52", searchAliases: ["Mexico City", "Cancun"] },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dialCode: "+55", searchAliases: ["Rio", "São Paulo", "Rio de Janeiro"] },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dialCode: "+54", searchAliases: ["Buenos Aires"] },
  { code: "PE", name: "Peru", flag: "🇵🇪", dialCode: "+51", searchAliases: ["Lima", "Machu Picchu"] },
  { code: "CL", name: "Chile", flag: "🇨🇱", dialCode: "+56", searchAliases: ["Santiago"] },
  { code: "CO", name: "Colombia", flag: "🇨🇴", dialCode: "+57", searchAliases: ["Bogota", "Medellin"] },
  { code: "PA", name: "Panama", flag: "🇵🇦", dialCode: "+507", searchAliases: ["Panama City"] },
  { code: "BS", name: "Bahamas", flag: "🇧🇸", dialCode: "+1", searchAliases: ["Nassau"] },
  { code: "JM", name: "Jamaica", flag: "🇯🇲", dialCode: "+1", searchAliases: ["Kingston", "Montego Bay"] },
  { code: "TH", name: "Thailand", flag: "🇹🇭", dialCode: "+66", searchAliases: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya"] },
  { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65", searchAliases: ["SG"] },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", dialCode: "+60", searchAliases: ["Kuala Lumpur", "KL", "Penang", "Langkawi"] },
  { code: "JP", name: "Japan", flag: "🇯🇵", dialCode: "+81", searchAliases: ["Tokyo", "Osaka", "Kyoto"] },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dialCode: "+82", searchAliases: ["Korea", "Seoul", "Busan"] },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", dialCode: "+84", searchAliases: ["Hanoi", "Ho Chi Minh", "Saigon", "Da Nang"] },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", dialCode: "+62", searchAliases: ["Bali", "Jakarta", "Lombok"] },
  { code: "PH", name: "Philippines", flag: "🇵🇭", dialCode: "+63", searchAliases: ["Manila", "Cebu", "Boracay"] },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", dialCode: "+94", searchAliases: ["Colombo", "Ceylon"] },
  { code: "NP", name: "Nepal", flag: "🇳🇵", dialCode: "+977", searchAliases: ["Kathmandu", "Pokhara", "Everest"] },
  { code: "MV", name: "Maldives", flag: "🇲🇻", dialCode: "+960", searchAliases: ["Male", "Maldive"] },
  { code: "BT", name: "Bhutan", flag: "🇧🇹", dialCode: "+975", searchAliases: ["Thimphu", "Paro"] },
  { code: "KH", name: "Cambodia", flag: "🇰🇭", dialCode: "+855", searchAliases: ["Phnom Penh", "Siem Reap", "Angkor Wat"] },
  { code: "LA", name: "Laos", flag: "🇱🇦", dialCode: "+856", searchAliases: ["Vientiane", "Luang Prabang"] },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", dialCode: "+880", searchAliases: ["Dhaka"] },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿", dialCode: "+7", searchAliases: ["Almaty", "Astana", "Nur-Sultan"] },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿", dialCode: "+998", searchAliases: ["Tashkent", "Samarkand", "Bukhara"] },
  { code: "AZ", name: "Azerbaijan", flag: "🇦🇿", dialCode: "+994", searchAliases: ["Baku"] },
  { code: "GE", name: "Georgia", flag: "🇬🇪", dialCode: "+995", searchAliases: ["Tbilisi", "Batumi"] },
  { code: "AM", name: "Armenia", flag: "🇦🇲", dialCode: "+374", searchAliases: ["Yerevan"] },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰", dialCode: "+852", searchAliases: ["HK"] },
  { code: "TW", name: "Taiwan", flag: "🇹🇼", dialCode: "+886", searchAliases: ["Taipei"] },
  { code: "KG", name: "Kyrgyzstan", flag: "🇰🇬", dialCode: "+996", searchAliases: ["Bishkek"] },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33", searchAliases: ["Paris", "Nice", "Lyon", "Schengen"] },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", dialCode: "+41", searchAliases: ["Zurich", "Geneva", "Bern"] },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49", searchAliases: ["Berlin", "Munich", "Frankfurt"] },
  { code: "IT", name: "Italy", flag: "🇮🇹", dialCode: "+39", searchAliases: ["Rome", "Milan", "Venice", "Florence"] },
  { code: "ES", name: "Spain", flag: "🇪🇸", dialCode: "+34", searchAliases: ["Madrid", "Barcelona", "Seville"] },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", dialCode: "+31", searchAliases: ["Amsterdam", "Holland"] },
  { code: "AT", name: "Austria", flag: "🇦🇹", dialCode: "+43", searchAliases: ["Vienna", "Salzburg", "Innsbruck"] },
  { code: "GR", name: "Greece", flag: "🇬🇷", dialCode: "+30", searchAliases: ["Athens", "Santorini", "Mykonos", "Crete"] },
  { code: "PT", name: "Portugal", flag: "🇵🇹", dialCode: "+351", searchAliases: ["Lisbon", "Porto", "Algarve"] },
  { code: "BE", name: "Belgium", flag: "🇧🇪", dialCode: "+32", searchAliases: ["Brussels", "Bruges"] },
  { code: "TR", name: "Turkey", flag: "🇹🇷", dialCode: "+90", searchAliases: ["Istanbul", "Ankara", "Cappadocia", "Turkiye", "Türkiye"] },
  { code: "RU", name: "Russia", flag: "🇷🇺", dialCode: "+7", searchAliases: ["Moscow", "Saint Petersburg"] },
  { code: "PL", name: "Poland", flag: "🇵🇱", dialCode: "+48", searchAliases: ["Warsaw", "Krakow"] },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿", dialCode: "+420", searchAliases: ["Prague", "Czechia"] },
  { code: "HU", name: "Hungary", flag: "🇭🇺", dialCode: "+36", searchAliases: ["Budapest"] },
  { code: "SE", name: "Sweden", flag: "🇸🇪", dialCode: "+46", searchAliases: ["Stockholm"] },
  { code: "NO", name: "Norway", flag: "🇳🇴", dialCode: "+47", searchAliases: ["Oslo", "Bergen"] },
  { code: "DK", name: "Denmark", flag: "🇩🇰", dialCode: "+45", searchAliases: ["Copenhagen"] },
  { code: "FI", name: "Finland", flag: "🇫🇮", dialCode: "+358", searchAliases: ["Helsinki"] },
  { code: "IS", name: "Iceland", flag: "🇮🇸", dialCode: "+354", searchAliases: ["Reykjavik"] },
  { code: "IE", name: "Ireland", flag: "🇮🇪", dialCode: "+353", searchAliases: ["Dublin"] },
  { code: "HR", name: "Croatia", flag: "🇭🇷", dialCode: "+385", searchAliases: ["Zagreb", "Dubrovnik", "Split"] },
  { code: "MT", name: "Malta", flag: "🇲🇹", dialCode: "+356", searchAliases: ["Valletta"] },
  { code: "CY", name: "Cyprus", flag: "🇨🇾", dialCode: "+357", searchAliases: ["Nicosia", "Limassol"] },
  { code: "RS", name: "Serbia", flag: "🇷🇸", dialCode: "+381", searchAliases: ["Belgrade"] },
  { code: "ME", name: "Montenegro", flag: "🇲🇪", dialCode: "+382", searchAliases: ["Podgorica", "Kotor"] },
  { code: "AL", name: "Albania", flag: "🇦🇱", dialCode: "+355", searchAliases: ["Tirana"] },
  { code: "RO", name: "Romania", flag: "🇷🇴", dialCode: "+40", searchAliases: ["Bucharest", "Transylvania"] },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬", dialCode: "+359", searchAliases: ["Sofia"] },
  { code: "EE", name: "Estonia", flag: "🇪🇪", dialCode: "+372", searchAliases: ["Tallinn"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44", searchAliases: ["UK", "England", "London", "Britain", "Scotland", "Wales"] },
  { code: "EG", name: "Egypt", flag: "🇪🇬", dialCode: "+20", searchAliases: ["Cairo", "Luxor", "Hurghada", "Sharm el Sheikh"] },
  { code: "MU", name: "Mauritius", flag: "🇲🇺", dialCode: "+230", searchAliases: ["Port Louis"] },
  { code: "SC", name: "Seychelles", flag: "🇸🇨", dialCode: "+248", searchAliases: ["Victoria", "Mahe"] },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", dialCode: "+27", searchAliases: ["Cape Town", "Johannesburg", "Durban"] },
  { code: "KE", name: "Kenya", flag: "🇰🇪", dialCode: "+254", searchAliases: ["Nairobi", "Mombasa", "Masai Mara"] },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", dialCode: "+255", searchAliases: ["Dar es Salaam", "Zanzibar", "Serengeti", "Kilimanjaro"] },
  { code: "MA", name: "Morocco", flag: "🇲🇦", dialCode: "+212", searchAliases: ["Casablanca", "Marrakech", "Fes", "Rabat"] },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", dialCode: "+251", searchAliases: ["Addis Ababa"] },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "+234", searchAliases: ["Lagos", "Abuja"] },
  { code: "GH", name: "Ghana", flag: "🇬🇭", dialCode: "+233", searchAliases: ["Accra"] },
  { code: "UG", name: "Uganda", flag: "🇺🇬", dialCode: "+256", searchAliases: ["Kampala"] },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", dialCode: "+250", searchAliases: ["Kigali"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61", searchAliases: ["Sydney", "Melbourne", "Brisbane", "Perth"] },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", dialCode: "+64", searchAliases: ["Auckland", "Wellington", "Queenstown"] },
  { code: "FJ", name: "Fiji", flag: "🇫🇯", dialCode: "+679", searchAliases: ["Suva", "Nadi"] },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91", searchAliases: ["Mumbai", "Delhi", "Bangalore", "Bharat", "Indian"] },
];

export const countryFilterOption = (
  option: { data: Country },
  inputValue: string
): boolean => {
  if (!inputValue) return true;
  const query = inputValue.toLowerCase().trim();
  const country = option.data;

  if (country.name.toLowerCase().includes(query)) return true;
  if (country.code.toLowerCase().includes(query)) return true;
  if (country.searchAliases?.some((alias) => alias.toLowerCase().includes(query))) return true;

  return false;
};

export const countryToOption = (country: Country) => ({
  value: country.code,
  label: country.name,
  data: country,
});

export const ALL_COUNTRY_OPTIONS = VISA_COUNTRIES.map(countryToOption);
