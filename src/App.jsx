import { useEffect, useState } from "react";

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    from: "",
    to: "",
    service: "House Shifting",
    date: "",
    details: "",
  });
  const [quoteEstimate, setQuoteEstimate] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminRole, setAdminRole] = useState("Branch Manager");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [customLocations, setCustomLocations] = useState(() => {
    try {
      const savedLocations = localStorage.getItem("speedwayServiceAreaLocations");
      if (savedLocations) {
        const parsedLocations = JSON.parse(savedLocations);
        return Array.isArray(parsedLocations) ? parsedLocations : [];
      }
    } catch (error) {
      console.error("Unable to load saved service areas.", error);
    }
    return [];
  });
  const [newLocation, setNewLocation] = useState({
    city: "",
    state: "Telangana",
    startingPrice: "₹3,999",
    movingTime: "Same-day local support",
  });

  const company = {
    name: "Speedway Worldwide Express",
    shortName: "SPEEDWAY",
    phone: "+91 9341422222",
    whatsapp: "919341422222",
    email: "support@speedwayindia.com",
    address:
      "9-1-218, Street No. 7, Mukarampura, Mahalaxmi Supermarket, Karimnagar-505002, Telangana",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Speedway+Worldwide+Express%2C+9-1-218%2C+Street+No.+7%2C+Mukarampura%2C+Karimnagar%2C+Telangana",
  };

  const getUserLocation = () => {

    if (!navigator.geolocation) {
      setLocationMessage(
        "Location access is not supported by this browser."
      );
      return;
    }

    setLocationMessage("Requesting location access...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserLocation({
          latitude,
          longitude,
        });

        setLocationMessage(
          "Your current location has been accessed successfully."
        );
      },
      (error) => {
        if (error.code === 1) {
          setLocationMessage(
            "Location access was denied. Please allow location permission in your browser."
          );
        } else if (error.code === 2) {
          setLocationMessage(
            "Your location could not be determined. Please try again."
          );
        } else {
          setLocationMessage(
            "Unable to access your location right now. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const services = [
    {
      icon: "🏠",
      title: "House Shifting",
      text: "Complete residential relocation with careful packing, loading, transportation and unloading.",
    },
    {
      icon: "🏢",
      title: "Office Relocation",
      text: "Organised office shifting designed to reduce downtime and keep your workplace move smooth.",
    },
    {
      icon: "📦",
      title: "Packing & Unpacking",
      text: "Careful packing solutions for furniture, household items, electronics, documents and valuables.",
    },
    {
      icon: "🚚",
      title: "Local Shifting",
      text: "Reliable moving assistance for local household and commercial relocations within Karimnagar.",
    },
    {
      icon: "🛣️",
      title: "Intercity Relocation",
      text: "Door-to-door relocation support for moving between cities with organised transportation.",
    },
    {
      icon: "🏍️",
      title: "Vehicle Transportation",
      text: "Transportation assistance for bikes, scooters and other personal vehicles.",
    },
  ];

  const advantages = [
    {
      icon: "📦",
      title: "Careful Packing",
      text: "Items are organised and packed according to their type and handling requirements.",
    },
    {
      icon: "🚛",
      title: "Reliable Transportation",
      text: "Planned transportation support for local and long-distance movement.",
    },
    {
      icon: "👷",
      title: "Moving Assistance",
      text: "A practical team approach for loading, unloading and shifting activities.",
    },
    {
      icon: "📍",
      title: "Door-to-Door Support",
      text: "From pickup to delivery, we help coordinate the important stages of your move.",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Share Your Requirement",
      text: "Tell us your pickup location, destination and the type of items you need to move.",
    },
    {
      number: "02",
      title: "Plan The Move",
      text: "We understand the shifting requirement and organise the appropriate moving support.",
    },
    {
      number: "03",
      title: "Pack & Load",
      text: "Your belongings are packed, arranged and loaded carefully for transportation.",
    },
    {
      number: "04",
      title: "Transport",
      text: "The packed items are transported towards the destination as planned.",
    },
    {
      number: "05",
      title: "Unload & Settle",
      text: "Items are unloaded at the destination and the move is brought to completion.",
    },
  ];

  const serviceAreas = [
    {
      city: "Karimnagar",
      district: "Karimnagar",
      location: "Karimnagar, Telangana, India",
      distance: "Local service area",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,500",
      office: "₹7,000",
    },

    {
      city: "Bhupalapally",
      district: "Jayashankar Bhupalapally",
      location:
        "Bhupalapally, Jayashankar Bhupalapally, Telangana, India",
      distance: "Approx. 120 km from Karimnagar",
      localPrice: "₹2,500",
      oneBHK: "₹6,500",
      twoBHK: "₹9,500",
      threeBHK: "₹13,500",
      office: "₹8,000",
    },

    {
      city: "Peddapalli",
      district: "Peddapalli",
      location: "Peddapalli, Telangana, India",
      distance: "Approx. 40 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,500",
      office: "₹7,000",
    },

    {
      city: "Ramagundam",
      district: "Peddapalli",
      location: "Ramagundam, Peddapalli, Telangana, India",
      distance: "Approx. 65 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Mancherial",
      district: "Mancherial",
      location: "Mancherial, Telangana, India",
      distance: "Approx. 75 km from Karimnagar",
      localPrice: "₹2,500",
      oneBHK: "₹6,000",
      twoBHK: "₹9,000",
      threeBHK: "₹12,500",
      office: "₹7,500",
    },

    {
      city: "Jagtial",
      district: "Jagtial",
      location: "Jagtial, Telangana, India",
      distance: "Approx. 50 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,000",
      office: "₹7,000",
    },

    {
      city: "Sircilla",
      district: "Rajanna Sircilla",
      location: "Sircilla, Rajanna Sircilla, Telangana, India",
      distance: "Approx. 65 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹11,500",
      office: "₹7,000",
    },

    {
      city: "Vemulawada",
      district: "Rajanna Sircilla",
      location: "Vemulawada, Rajanna Sircilla, Telangana, India",
      distance: "Approx. 50 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,000",
      office: "₹7,000",
    },

    {
      city: "Siddipet",
      district: "Siddipet",
      location: "Siddipet, Telangana, India",
      distance: "Approx. 110 km from Karimnagar",
      localPrice: "₹2,800",
      oneBHK: "₹6,500",
      twoBHK: "₹9,500",
      threeBHK: "₹13,500",
      office: "₹8,000",
    },

    {
      city: "Warangal",
      district: "Warangal",
      location: "Warangal, Telangana, India",
      distance: "Approx. 150 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹15,000",
      office: "₹9,000",
    },

    {
      city: "Hanamkonda",
      district: "Hanamkonda",
      location: "Hanamkonda, Telangana, India",
      distance: "Approx. 150 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹15,000",
      office: "₹9,000",
    },

    {
      city: "Hyderabad",
      district: "Hyderabad",
      location: "Hyderabad, Telangana, India",
      distance: "Approx. 165 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Secunderabad",
      district: "Hyderabad",
      location: "Secunderabad, Telangana, India",
      distance: "Approx. 165 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Nizamabad",
      district: "Nizamabad",
      location: "Nizamabad, Telangana, India",
      distance: "Approx. 125 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹14,500",
      office: "₹9,000",
    },

    {
      city: "Adilabad",
      district: "Adilabad",
      location: "Adilabad, Telangana, India",
      distance: "Approx. 160 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹7,500",
      twoBHK: "₹11,000",
      threeBHK: "₹15,500",
      office: "₹9,500",
    },

    {
      city: "Khammam",
      district: "Khammam",
      location: "Khammam, Telangana, India",
      distance: "Approx. 220 km from Karimnagar",
      localPrice: "₹4,000",
      oneBHK: "₹8,500",
      twoBHK: "₹13,000",
      threeBHK: "₹18,000",
      office: "₹11,000",
    },

    {
      city: "Nalgonda",
      district: "Nalgonda",
      location: "Nalgonda, Telangana, India",
      distance: "Approx. 220 km from Karimnagar",
      localPrice: "₹4,000",
      oneBHK: "₹8,500",
      twoBHK: "₹13,000",
      threeBHK: "₹18,000",
      office: "₹11,000",
    },

    {
      city: "Suryapet",
      district: "Suryapet",
      location: "Suryapet, Telangana, India",
      distance: "Approx. 190 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Mahbubnagar",
      district: "Mahbubnagar",
      location: "Mahbubnagar, Telangana, India",
      distance: "Approx. 300 km from Karimnagar",
      localPrice: "₹4,500",
      oneBHK: "₹9,000",
      twoBHK: "₹14,000",
      threeBHK: "₹20,000",
      office: "₹12,000",
    },

    {
      city: "Medak",
      district: "Medak",
      location: "Medak, Telangana, India",
      distance: "Approx. 180 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Bhongir",
      district: "Yadadri Bhuvanagiri",
      location:
        "Bhongir, Yadadri Bhuvanagiri, Telangana, India",
      distance: "Approx. 190 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Jangaon",
      district: "Jangaon",
      location: "Jangaon, Telangana, India",
      distance: "Approx. 150 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹15,000",
      office: "₹9,000",
    },

    {
      city: "Kothagudem",
      district: "Bhadradri Kothagudem",
      location:
        "Kothagudem, Bhadradri Kothagudem, Telangana, India",
      distance: "Approx. 270 km from Karimnagar",
      localPrice: "₹4,500",
      oneBHK: "₹9,000",
      twoBHK: "₹14,000",
      threeBHK: "₹20,000",
      office: "₹12,000",
    },

    {
      city: "Miryalaguda",
      district: "Nalgonda",
      location: "Miryalaguda, Nalgonda, Telangana, India",
      distance: "Approx. 250 km from Karimnagar",
      localPrice: "₹4,000",
      oneBHK: "₹8,500",
      twoBHK: "₹13,000",
      threeBHK: "₹18,000",
      office: "₹11,000",
    },

    {
      city: "Huzurabad",
      district: "Karimnagar",
      location: "Huzurabad, Karimnagar district, Telangana, India",
      distance: "Approx. 40 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,000",
      office: "₹7,000",
    },

    {
      city: "Manakondur",
      district: "Karimnagar",
      location: "Manakondur, Karimnagar district, Telangana, India",
      distance: "Approx. 25 km from Karimnagar",
      localPrice: "₹1,800",
      oneBHK: "₹5,000",
      twoBHK: "₹7,500",
      threeBHK: "₹10,500",
      office: "₹6,500",
    },

    {
      city: "Choppadandi",
      district: "Karimnagar",
      location: "Choppadandi, Karimnagar district, Telangana, India",
      distance: "Approx. 25 km from Karimnagar",
      localPrice: "₹1,800",
      oneBHK: "₹5,000",
      twoBHK: "₹7,500",
      threeBHK: "₹10,500",
      office: "₹6,500",
    },

    {
      city: "Jammikunta",
      district: "Karimnagar",
      location: "Jammikunta, Telangana, India",
      distance: "Approx. 60 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Husnabad",
      district: "Siddipet",
      location: "Husnabad, Siddipet district, Telangana, India",
      distance: "Approx. 70 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Korutla",
      district: "Jagtial",
      location: "Korutla, Jagtial district, Telangana, India",
      distance: "Approx. 75 km from Karimnagar",
      localPrice: "₹2,300",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Metpally",
      district: "Jagtial",
      location: "Metpally, Jagtial district, Telangana, India",
      distance: "Approx. 90 km from Karimnagar",
      localPrice: "₹2,500",
      oneBHK: "₹6,000",
      twoBHK: "₹9,000",
      threeBHK: "₹12,500",
      office: "₹7,500",
    },

    {
      city: "Dharmapuri",
      district: "Jagtial",
      location: "Dharmapuri, Jagtial district, Telangana, India",
      distance: "Approx. 75 km from Karimnagar",
      localPrice: "₹2,300",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },
  ];

  const filteredCities = serviceAreas.filter((area) => {
    const search = searchCity.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      area.city.toLowerCase().includes(search) ||
      area.district.toLowerCase().includes(search) ||
      area.location.toLowerCase().includes(search)
    );
  });


  const screenshotServiceAreas = [
    "Karimnagar",
    "Peddapalli",
    "Kamareddy",
    "Sircilla",
    "Gajwel",
    "Jagtial",
    "Jangaon",
    "Godavarikhani",
    "Basanth Nagar",
    "Manthani",
    "Bhupalapally",
    "Hyderabad",
    "Siddipet",
    "Rangareddy",
    "Medak",
    "Ellareddypet",
    "Korutla",
    "Metpally",
    "Nirmal",
    "Adilabad",
    "Madhapur",
    "Godichirowli",
    "Kondapur",
    "High-Tech City",
    "Medchal",
    "Pragathi Nagar",
    "Mumbai",
    "Thane",
    "Mulund",
    "Ghatkopar",
    "Kurla",
    "Dadar",
    "Kalyan",
    "Dombivli",
    "Pune",
    "Bangalore",
    "Chennai",
    "Rajahmundry",
    "Vijayawada",
    "Visakhapatnam",
  ].map((city) => {
    const existing = serviceAreas.find(
      (area) =>
        area.city.toLowerCase() === city.toLowerCase()
    );

    const defaults = {
      district: "Telangana",
      location: `${city}, Telangana, India`,
      distance: "Long-distance service area",
      localPrice: "₹3,999",
      oneBHK: "₹6,999",
      twoBHK: "₹9,999",
      threeBHK: "₹12,999",
      office: "₹8,999",
      areasCovered: "Service available",
      branch: false,
    };

    return {
      ...defaults,
      ...(existing || {}),
      city,
    };
  });

  const filteredScreenshotServiceAreas = screenshotServiceAreas.filter((area) => {
    const search = searchCity.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      area.city.toLowerCase().includes(search) ||
      area.location.toLowerCase().includes(search) ||
      area.district.toLowerCase().includes(search)
    );
  });

  const filteredCustomLocations = customLocations.filter((area) => {
    const search = searchCity.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      area.city.toLowerCase().includes(search) ||
      area.location.toLowerCase().includes(search) ||
      area.district.toLowerCase().includes(search)
    );
  });

  const handleAddLocation = (event) => {
    event.preventDefault();

    const cityName = newLocation.city.trim();
    const stateName = newLocation.state.trim() || "Telangana";

    if (!cityName) {
      return;
    }

    const alreadyExists = [
      ...screenshotServiceAreas,
      ...customLocations,
    ].some(
      (area) =>
        area.city.trim().toLowerCase() ===
        cityName.toLowerCase()
    );

    if (alreadyExists) {
      window.alert(`${cityName} is already in Service Areas.`);
      return;
    }

    const locationToAdd = {
      city: cityName,
      district: stateName,
      location: `${cityName}, ${stateName}, India`,
      distance: "Service area available",
      localPrice: newLocation.startingPrice || "₹3,999",
      oneBHK: "₹6,999",
      twoBHK: "₹9,999",
      threeBHK: "₹12,999",
      office: "₹8,999",
      startingPrice: newLocation.startingPrice || "₹3,999",
      movingTime: newLocation.movingTime || "Same-day local support",
      areasCovered: "Service available",
      branch: false,
    };

    setCustomLocations((current) => [...current, locationToAdd]);
    setSearchCity("");
    setNewLocation({
      city: "",
      state: "Telangana",
      startingPrice: "₹3,999",
      movingTime: "Same-day local support",
    });
    setShowAddLocation(false);
  };

  const handleDeleteCustomLocation = (cityName) => {
    const confirmed = window.confirm(
      `Delete ${cityName} from your added Service Areas?`
    );

    if (!confirmed) {
      return;
    }

    setCustomLocations((current) =>
      current.filter(
        (area) =>
          area.city.trim().toLowerCase() !==
          cityName.trim().toLowerCase()
      )
    );

    if (
      selectedCity &&
      selectedCity.city.trim().toLowerCase() ===
        cityName.trim().toLowerCase()
    ) {
      setSelectedCity(null);
    }
  };

  const getCityDetails = (city) => {
    if (city.city === "Korutla") {
      return {
        ...city,
        district: "Telangana",
        location: "Korutla, Telangana, India",
        distance: "45 minutes from our Karimnagar base",
        localPrice: "₹3,999",
        oneBHK: "₹6,999",
        twoBHK: "₹9,999",
        threeBHK: "₹12,999",
        office: "₹9,999",
        startingPrice: "₹4,499",
        movingTime: "5–8 hours for a 2BHK, same-day completion",
        description:
          "Korutla is a trading town whose market yard drives constant commercial movement — trader families shifting homes, shops relocating, and agricultural business moves. Just 45 minutes from our Karimnagar base, Korutla gets full same-day service, and our weekly Hyderabad truck offers affordable shared-load options.",
        landmarks: [
          "Korutla Bus Stand",
          "Market Yard",
          "Metpally Road",
        ],
        challenges:
          "Market-yard area loading happens before 8 AM to avoid trader traffic. Multi-generation joint families here mean large 4–5BHK inventories that need full-day packing with 6-member crews.",
        testimonial:
          "Moved our shop and house together over one weekend. Business did not stop for a single day. Superb planning.",
        testimonialBy:
          "Raju Goud, Market Yard, Korutla",
        services: [
          ["Local Moving", "₹3,999"],
          ["Long-Distance Moving", "₹12,999"],
          ["Office Relocation", "₹9,999"],
          ["Packing & Unpacking", "₹2,499"],
          ["Car Transportation", "₹6,999"],
          ["Storage & Warehousing", "₹1,999/mo"],
          ["Loading & Unloading", "₹1,999"],
          ["Insurance Coverage", "3% of value"],
        ],
      };
    }

    return {
      ...city,
      startingPrice: city.localPrice || "₹3,999",
      movingTime: "Same-day local support or planned intercity relocation",
      description:
        `${city.city} is covered by Speedway Worldwide Express for household, office and commercial relocation requirements. Our team can coordinate packing, loading, transportation and unloading based on the size, distance and moving schedule.`,
      landmarks: [
        `${city.city} main area`,
        `${city.city} market / commercial zone`,
        `${city.city} transport route`,
      ],
      challenges:
        `Every move in ${city.city} is planned around road access, parking, building access, floor level and the quantity of goods. We coordinate pickup and delivery timing to make the relocation more organised.`,
      testimonial:
        `The team handled our shifting carefully and kept the move organised from packing to delivery.`,
      testimonialBy: `Speedway Worldwide Express customer, ${city.city}`,
      services: [
        ["Local Moving", city.localPrice || "₹3,999"],
        ["Long-Distance Moving", city.threeBHK || "₹12,999"],
        ["Office Relocation", city.office || "₹8,999"],
        ["Packing & Unpacking", "₹2,499"],
        ["Car Transportation", "₹6,999"],
        ["Storage & Warehousing", "₹1,999/mo"],
        ["Loading & Unloading", "₹1,999"],
        ["Insurance Coverage", "3% of value"],
      ],
    };
  };

  const guides = [
    {
      icon: "💰",
      category: "Cost Guide",
      time: "6 min",
      title:
        "How Much Do Packers and Movers Charge in Karimnagar? [2026 Price Guide]",
      text:
        "Realistic 2026 price guidance for 1BHK, 2BHK and 3BHK moves in Karimnagar — plus the factors that can change your quote and ways to avoid unexpected charges.",
    },
    {
      icon: "✅",
      category: "Checklists",
      time: "7 min",
      title:
        "Moving from Karimnagar to Hyderabad: Complete Checklist",
      text:
        "A practical checklist for Karimnagar–Hyderabad moves covering permissions, utility transfers, packing order and moving-day preparation.",
    },
    {
      icon: "📦",
      category: "Packing Tips",
      time: "5 min",
      title:
        "Top 10 Tips for Packing Fragile Items During Monsoon",
      text:
        "Simple packing tips to help protect glassware, electronics, décor and other fragile belongings during humid and rainy conditions.",
    },
  ];

  const faqs = [
    {
      q: "What types of shifting services are available?",
      a: "We provide household shifting, office relocation, packing and unpacking, local shifting, intercity relocation and vehicle transportation assistance.",
    },
    {
      q: "Do you provide packing services?",
      a: "Yes. Packing support can be arranged for household goods, furniture, electronics, kitchen items, documents and other belongings.",
    },
    {
      q: "Can I request a moving quotation?",
      a: "Yes. Use the Get Free Quote button and provide your basic moving details. Our team can then discuss your requirement.",
    },
    {
      q: "Do you provide local shifting in Karimnagar?",
      a: "Yes. Local relocation support is available for shifting requirements around Karimnagar and nearby areas.",
    },
    {
      q: "How can I contact Speedway Worldwide Express?",
      a: "You can call the listed number, use WhatsApp, or visit the Mukarampura location using the Google Maps button.",
    },
  ];

  useEffect(() => {
    try {
      localStorage.setItem(
        "speedwayServiceAreaLocations",
        JSON.stringify(customLocations)
      );
    } catch (error) {
      console.error("Unable to save service areas.", error);
    }
  }, [customLocations]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#f1f6ef";
    document.body.style.fontFamily =
      "Inter, Arial, Helvetica, sans-serif";
  }, []);

  const scrollToSection = (id) => {
    setMobileMenu(false);

    const element = document.getElementById(id);

    if (element) {
      const headerHeight =
        window.innerWidth <= 850 ? 72 : 94;

      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Speedway Worldwide Express, I would like to know more about your packing and moving services."
    );

    window.open(
      `https://wa.me/${company.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  const callNow = () => {
    window.location.href = `tel:${company.phone}`;
  };

  const openMaps = () => {
    window.open(company.maps, "_blank");
  };

  const openAdminPortal = () => {
    setMobileMenu(false);
    setShowAdminLogin(true);
  };

  const closeAdminPortal = () => {
    setShowAdminLogin(false);
    setShowAdminPassword(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (!adminEmail.trim() || !adminPassword.trim()) {
      alert("Please enter your email address and password.");
      return;
    }

    alert(
      "Admin authentication is not connected yet. Connect your secure backend authentication to enable dashboard login."
    );
  };

  const handleForgotPassword = () => {
    alert(
      "Please contact the system administrator to reset your admin password."
    );
  };

  const quoteCityCoordinates = {
    karimnagar: [18.4386, 79.1288],
    peddapalli: [18.6159, 79.3744],
    ramagundam: [18.8000, 79.4500],
    jagtial: [18.7947, 78.9166],
    korutla: [18.8226, 78.7118],
    vemulawada: [18.4655, 78.8689],
    sircilla: [18.3889, 78.8100],
    mancherial: [18.8756, 79.4591],
    warangal: [17.9784, 79.5941],
    hanamkonda: [17.9784, 79.5941],
    siddipet: [18.1018, 78.8520],
    hyderabad: [17.3850, 78.4867],
    secunderabad: [17.4399, 78.4983],
    nizamabad: [18.6725, 78.0941],
    adilabad: [19.6641, 78.5320],
    vijayawada: [16.5062, 80.6480],
    visakhapatnam: [17.6868, 83.2185],
    chennai: [13.0827, 80.2707],
    bangalore: [12.9716, 77.5946],
    bengaluru: [12.9716, 77.5946],
    pune: [18.5204, 73.8567],
    mumbai: [19.0760, 72.8777],
    delhi: [28.6139, 77.2090],
    kolkata: [22.5726, 88.3639],
    pune: [18.5204, 73.8567],
  };

  const getQuoteCity = (value) => {
    const key = value.trim().toLowerCase();
    if (quoteCityCoordinates[key]) return quoteCityCoordinates[key];

    const match = Object.keys(quoteCityCoordinates).find((city) =>
      key.includes(city) || city.includes(key)
    );

    return match ? quoteCityCoordinates[match] : null;
  };

  const calculateRoadDistance = (from, to) => {
    const a = getQuoteCity(from);
    const b = getQuoteCity(to);
    if (!a || !b) return null;

    const toRad = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371;
    const dLat = toRad(b[0] - a[0]);
    const dLon = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);

    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const airDistance =
      2 * earthRadius * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

    return Math.max(airDistance * 1.18, 10);
  };

  const calculateCityToCityPrice = (from, to, service) => {
    const distance = calculateRoadDistance(from, to);
    if (!distance) return null;

    const minimum = service === "Vehicle Transportation" ? 4500 : 3000;
    const rate =
      service === "Vehicle Transportation"
        ? 16
        : service === "Office Relocation"
        ? 15
        : service === "Packing & Unpacking"
        ? 11
        : 13;

    const serviceCharge =
      service === "House Shifting"
        ? 1800
        : service === "Office Relocation"
        ? 2500
        : service === "Intercity Relocation"
        ? 2200
        : 1200;

    const price = Math.max(minimum, Math.round(distance * rate + serviceCharge));

    return {
      distance: Math.round(distance),
      price,
    };
  };

  const updateQuoteField = (field, value) => {
    setQuoteForm((current) => {
      const next = { ...current, [field]: value };
      const estimate = calculateCityToCityPrice(
        next.from,
        next.to,
        next.service
      );
      setQuoteEstimate(estimate);
      return next;
    });
  };

  const submitQuote = (e) => {
    e.preventDefault();

    const estimate = calculateCityToCityPrice(
      quoteForm.from,
      quoteForm.to,
      quoteForm.service
    );

    if (!estimate) {
      alert(
        "Please enter supported city names such as Karimnagar, Hyderabad, Mumbai, Delhi, Chennai, Bengaluru, Pune or Vijayawada to calculate an estimated city-to-city price."
      );
      return;
    }

    alert(
      `Thank you for contacting Speedway Worldwide Express.\n\nEstimated city-to-city price: ₹${estimate.price.toLocaleString("en-IN")}\nApprox. distance: ${estimate.distance.toLocaleString("en-IN")} km\n\nOur team will contact you to confirm the final quotation.`
    );

    setShowQuote(false);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        a {
          text-decoration: none;
        }

        /* =========================
           MAIN
        ========================= */

        .app {
          min-height: 100vh;
          color: #17243b;
          background: linear-gradient(
            180deg,
            #edf5e9 0%,
            #ffffff 45%,
            #edf5e9 100%
          );
        }

        @keyframes totalBlink {
          0% {
            opacity: 1;
          }

          46% {
            opacity: 1;
          }

          50% {
            opacity: 0.72;
          }

          54% {
            opacity: 0.98;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes floatUp {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        .blink-text {
          animation: totalBlink 3.8s ease-in-out infinite;
        }

        .contact-card .blink-text {
          color: #ffffff;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }

        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        .container {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* =========================
           TOP BAR
        ========================= */

        .topbar {
          background: #0b0f0c;
          color: #ffffff;
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7px 20px;
          font-size: 13px;
          letter-spacing: 0.3px;
          border-bottom: 1px solid
            rgba(217, 107, 39, 0.5);
        }

        .topbar-inner {
          width: min(1240px, 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .topbar span {
          opacity: 0.95;
        }

        .topbar strong {
          color: #5f9f3a;
        }

        /* =========================
           HEADER / NAVBAR
        ========================= */

        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #0b0f0c;
          border-bottom: 1px solid
            rgba(217, 107, 39, 0.45);
          box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.18);
        }

        .nav {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
          min-height: 94px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          min-width: max-content;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #5f9f3a !important;
          border: 0 !important;
          color: #ffffff !important;
          font-size: 23px;
          font-weight: 900;
          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.2);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .logo-text strong {
          color: #ffffff;
          font-family: Georgia, serif;
          font-size: 20px;
          line-height: 1.1;
        }

        .logo-text span {
          color: #5f9f3a;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-links button {
          border: 0;
          background: transparent;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 0;
          transition: 0.25s;
        }

        .nav-links button:hover {
          color: #5f9f3a;
        }

        .admin-nav-button {
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
          background: rgba(255, 255, 255, 0.06) !important;
          color: #ffffff !important;
          padding: 11px 16px !important;
          border-radius: 8px;
          transition: 0.25s;
        }

        .admin-nav-button:hover {
          background: #5f9f3a !important;
          border-color: #5f9f3a !important;
          color: #ffffff !important;
          transform: translateY(-2px);
        }

        .admin-nav-button:active {
          transform: translateY(0);
        }

        .nav-quote {
          background: #5f9f3a !important;
          color: #ffffff !important;
          padding: 12px 18px !important;
          border-radius: 8px;
          box-shadow:
            0 7px 18px rgba(217, 107, 39, 0.3);
        }

        .nav-quote:hover {
          background: #5f9f3a !important;
          color: #ffffff !important;
          transform: translateY(-2px);
        }

        .menu-button {
          display: none;
          width: 44px;
          height: 44px;
          border: 1px solid
            rgba(255, 255, 255, 0.3);
          background: #0b0f0c;
          border-radius: 8px;
          font-size: 23px;
          cursor: pointer;
          color: #ffffff;
        }

        /* =========================
           HERO / HOMEPAGE
        ========================= */

        .hero {
          min-height: 485px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #0b0f0c;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          border: 80px solid
            rgba(255, 255, 255, 0.07);
          right: -190px;
          top: 40px;
        }

        .hero::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          left: -130px;
          bottom: -120px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
          padding: 22px 0;
          text-align: left;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1px solid
            rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .hero h1 {
          max-width: 900px;
          margin: 0;
          color: #ffffff;
          font-family: Georgia, serif;
          font-size: clamp(45px, 6vw, 82px);
          line-height: 1.03;
          letter-spacing: -2px;
          text-align: left;
        }

        .hero h1 span {
          color: #5f9f3a;
        }

        .hero p {
          max-width: 700px;
          color: #edf5e9;
          font-size: 18px;
          line-height: 1.75;
          margin: 12px 0 0;
          text-align: left;
        }

        .hero-extra-matter {
          max-width: 820px;
          margin: 20px 0 22px;
        }

        .hero-extra-matter p {
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          line-height: 1.75;
        }

        .hero-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 22px;
          margin-top: 15px;
        }

        .hero-highlights span {
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
        }

        .hero-actions {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 13px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .btn {
          border: 0;
          cursor: pointer;
          border-radius: 8px;
          padding: 14px 21px;
          font-weight: 700;
          transition: 0.3s;
        }

        .btn-primary {
          background: #5f9f3a;
          color: #ffffff;
          box-shadow:
            0 10px 25px rgba(217, 107, 39, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          background: #5f9f3a;
        }

        .btn-light {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 1px solid
            rgba(255, 255, 255, 0.35);
        }

        .btn-light:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.2);
        }

        .hero-contact {
          margin-top: 17px;
          display: flex;
          justify-content: flex-start;
          gap: 30px;
          flex-wrap: wrap;
        }

        .hero-contact-item {
          color: #edf5e9;
          font-size: 14px;
          text-align: left;
        }

        .hero-contact-item strong {
          color: #5f9f3a;
          display: block;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        /* =========================
           SPEEDWAY TRUCK ANIMATION
        ========================= */
        .speedway-truck-animation {
          position: relative;
          width: min(100%, 680px);
          height: 150px;
          margin: 28px 0 0;
          overflow: hidden;
          border-radius: 18px;
          background: linear-gradient(to bottom, #111111 0%, #111111 74%, #6baa45 74%, #6baa45 100%);
          border: 1px solid rgba(107,170,69,0.55);
          box-shadow: 0 18px 40px rgba(0,0,0,0.28);
        }
        .speedway-road {
          position: absolute;
          left: 0; right: 0; bottom: 0; height: 39px;
          background: #000000;
        }
        .speedway-road::after {
          content: ""; position: absolute; left: 0; right: 0; top: 18px; height: 3px;
          background: repeating-linear-gradient(90deg, #6baa45 0 65px, transparent 65px 115px);
        }
        .speedway-truck {
          position: absolute; left: -270px; bottom: 28px; width: 260px; height: 82px;
          animation: speedwayDrive 9s linear infinite;
        }
        .speedway-trailer {
          position: absolute; left: 0; top: 0; width: 190px; height: 62px;
          background: #6baa45; border: 3px solid #000; border-radius: 7px 2px 2px 7px;
          box-shadow: inset 0 -8px 0 rgba(0,0,0,0.12);
        }
        .speedway-trailer::before {
          content: "SPEEDWAY"; position: absolute; left: 20px; top: 14px;
          color: #000; font-weight: 900; font-size: 18px; letter-spacing: 2px;
        }
        .speedway-trailer::after {
          content: "WORLDWIDE EXPRESS"; position: absolute; left: 21px; top: 38px;
          color: #000; font-weight: 800; font-size: 7px; letter-spacing: 1px;
        }
        .speedway-cabin {
          position: absolute; right: 0; top: 15px; width: 76px; height: 67px;
          background: #000; border: 3px solid #6baa45; border-radius: 6px 14px 7px 4px;
        }
        .speedway-window {
          position: absolute; left: 10px; top: 8px; width: 39px; height: 23px;
          background: #6baa45; border: 2px solid #000; border-radius: 4px;
        }
        .speedway-bumper {
          position: absolute; right: -5px; bottom: 3px; width: 13px; height: 12px; background: #6baa45; border-radius: 2px;
        }
        .speedway-wheel {
          position: absolute; bottom: -12px; width: 29px; height: 29px; border-radius: 50%;
          background: #000; border: 5px solid #6baa45; box-shadow: inset 0 0 0 4px #111;
        }
        .speedway-wheel.one { left: 32px; }
        .speedway-wheel.two { right: 19px; }
        @keyframes speedwayDrive {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 360px)); }
        }

        /* =========================
           TRUST
        ========================= */

        .trust-strip {
          background: #0b0f0c;
          color: #ffffff;
          padding: 14px 0;
        }

        .trust-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 20px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          padding: 8px 14px;
          border-right: 1px solid
            rgba(255, 255, 255, 0.13);
          text-align: left;
        }

        .trust-item:last-child {
          border-right: 0;
        }

        .trust-icon {
          font-size: 25px;
        }

        .trust-item strong {
          display: block;
          color: #5f9f3a;
          font-size: 13px;
        }

        .trust-item span {
          display: block;
          color: #edf5e9;
          font-size: 11px;
          margin-top: 3px;
        }

        /* =========================
           SECTIONS
        ========================= */

        .section {
          padding: 30px 0;
        }

        .section.alt {
          background: #edf5e9;
        }

        .section.faq-section {
          background: #edf5e9;
        }

        .section.services-section {
          background: #0b0f0c;
        }

        .services-section .section-heading h2,
        .services-section .section-heading p {
          color: #ffffff;
        }

        .section.dark {
          background: #0b0f0c;
          color: #ffffff;
        }

        .section-heading {
          width: 100%;
          max-width: 780px;
          margin: 0 0 18px;
          text-align: left;
        }

        .eyebrow {
          color: #5f9f3a;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
          text-align: left;
        }

        .dark .eyebrow {
          color: #5f9f3a;
        }

        .section-heading h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(34px, 4vw, 54px);
          line-height: 1.08;
          color: #0b0f0c;
          text-align: left;
        }

        .dark .section-heading h2 {
          color: #ffffff;
        }

        .section-heading p {
          color: #4f5a4d;
          line-height: 1.75;
          margin: 9px 0 0;
          font-size: 16px;
          text-align: left;
        }

        .dark .section-heading p {
          color: #edf5e9;
        }

        /* =========================
           ABOUT
        ========================= */

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
        }

        .about-image {
          height: 100%;
          min-height: 330px;
          border-radius: 18px;

          background:
            linear-gradient(
              rgba(11, 42, 74, 0.3),
              rgba(11, 42, 74, 0.6)
            ),
            url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85")
              center / cover;

          border: 5px solid #ffffff;

          box-shadow:
            0 20px 45px rgba(11, 42, 74, 0.18);
        }

        .about-content {
          text-align: left;
        }

        .about-content h3 {
          color: #0b0f0c;
          font-family: Georgia, serif;
          font-size: 34px;
          line-height: 1.2;
          margin: 0 0 15px;
          text-align: left;
        }

        .about-content p {
          color: #4f5a4d;
          line-height: 1.8;
          margin: 0 0 16px;
          text-align: left;
        }

        .about-points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 18px;
        }

        .point {
          background: #ffffff;
          border: 1px solid #edf5e9;
          padding: 15px;
          border-radius: 10px;
          color: #0b0f0c;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          transition: 0.25s;
        }

        .point:hover {
          transform: translateY(-3px);
          border-color: #5f9f3a;
        }

        /* =========================
           ABOUT CAR ANIMATION
        ========================= */
        .speedway-about-animation {
          position: relative; min-height: 170px; margin-top: 24px; overflow: hidden;
          border-radius: 18px; background: #000; border: 1px solid rgba(107,170,69,0.5);
          box-shadow: 0 16px 35px rgba(0,0,0,0.18);
        }
        .speedway-about-sun {
          position: absolute; width: 95px; height: 95px; border-radius: 50%;
          right: 35px; top: 22px; background: rgba(107,170,69,0.16); border: 1px solid rgba(107,170,69,0.35);
        }
        .speedway-about-road {
          position: absolute; left: 0; right: 0; bottom: 0; height: 45px; background: #0b0b0b;
        }
        .speedway-about-road::after {
          content: ""; position: absolute; left: 0; right: 0; top: 20px; height: 3px;
          background: repeating-linear-gradient(90deg, #6baa45 0 55px, transparent 55px 100px);
        }
        .speedway-car {
          position: absolute; left: -160px; bottom: 31px; width: 150px; height: 65px;
          animation: speedwayCarDrive 7s linear infinite;
        }
        .speedway-car-body {
          position: absolute; left: 5px; bottom: 8px; width: 138px; height: 39px;
          background: #6baa45; border: 3px solid #000; border-radius: 12px 20px 8px 8px;
        }
        .speedway-car-roof {
          position: absolute; left: 38px; top: 5px; width: 68px; height: 30px;
          background: #000; border: 3px solid #6baa45; border-radius: 25px 25px 5px 5px;
        }
        .speedway-car-window {
          position: absolute; left: 48px; top: 11px; width: 24px; height: 17px; background: #6baa45; border-radius: 5px 2px 2px 2px;
        }
        .speedway-car-window.two { left: 75px; border-radius: 2px 5px 2px 2px; }
        .speedway-car-wheel {
          position: absolute; bottom: -5px; width: 28px; height: 28px; border-radius: 50%;
          background: #000; border: 5px solid #6baa45;
        }
        .speedway-car-wheel.one { left: 22px; }
        .speedway-car-wheel.two { right: 20px; }
        @keyframes speedwayCarDrive {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 250px)); }
        }

        /* =========================
           SERVICES
        ========================= */

        .service-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        .service-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #ffffff;
          border: 1px solid #edf5e9;
          border-radius: 15px;
          padding: 18px;
          min-height: 195px;
          text-align: left;
          transition: 0.35s;
        }

        .service-card:hover {
          transform: translateY(-7px);
          border-color: #5f9f3a;
          box-shadow:
            0 18px 35px rgba(11, 42, 74, 0.12);
        }

        .service-icon {
          width: 55px;
          height: 55px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: #edf5e9;
          border: 2px solid #edf5e9;
          font-size: 26px;
          margin-bottom: 14px;
        }

        .service-card h3 {
          width: 100%;
          margin: 0 0 10px;
          color: #0b0f0c;
          font-family: Georgia, serif;
          font-size: 22px;
          line-height: 1.25;
          text-align: left;
        }

        .service-card p {
          width: 100%;
          margin: 0;
          color: #4f5a4d;
          line-height: 1.65;
          font-size: 14px;
          text-align: left;
        }

        .service-link {
          margin-top: auto;
          padding-top: 17px;
          color: #5f9f3a;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          text-align: left;
        }

        .service-link:hover {
          color: #5f9f3a;
        }

        /* =========================
           ADVANTAGES
        ========================= */

        .advantage-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        .advantage-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 18px;
          background:  rgba(225, 191, 169, 0.45);
          border-radius: 15px;
          border: 1px solid
            rgba(255, 255, 255, 0.14);
          text-align: left;
          transition: 0.3s;
        }

        .advantage-card:hover {
          transform: translateY(-6px);
          background: #304535;
        }

        .advantage-icon {
          width: 53px;
          height: 53px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(217, 107, 39, 0.16);
          font-size: 27px;
          margin-bottom: 12px;
        }

        .advantage-card h3 {
          width: 100%;
          margin: 0 0 9px;
          color: #5f9f3a;
          font-family: Georgia, serif;
          font-size: 20px;
          text-align: left;
        }

        .advantage-card p {
          width: 100%;
          color: #e2e6e1;
          line-height: 1.65;
          font-size: 13px;
          margin: 0;
          text-align: left;
        }

        /* =========================
           PROCESS
        ========================= */

        .process-grid {
          display: grid;
          grid-template-columns:
            repeat(5, 1fr);
          gap: 13px;
          align-items: stretch;
        }

        .process-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #ffffff;
          border: 1px solid #edf5e9;
          padding: 16px;
          border-radius: 14px;
          min-height: 175px;
          text-align: left;
          transition: 0.3s;
        }

        .process-card:hover {
          transform: translateY(-6px);
          border-color: #5f9f3a;
          box-shadow:
            0 15px 30px rgba(11, 42, 74, 0.1);
        }

        .process-number {
          color: #5f9f3a;
          font-size: 29px;
          font-family: Georgia, serif;
          font-weight: bold;
        }

        .process-card h3 {
          width: 100%;
          color: #0b0f0c;
          font-family: Georgia, serif;
          font-size: 19px;
          line-height: 1.3;
          margin: 12px 0 7px;
          text-align: left;
        }

        .process-card p {
          width: 100%;
          color: #4f5a4d;
          font-size: 13px;
          line-height: 1.65;
          margin: 0;
          text-align: left;
        }

        /* =========================
           AREAS
        ========================= */

        .areas-grid {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .area-pill {
          padding: 9px 14px;
          background: #ffffff;
          border: 1px solid #edf5e9;
          border-radius: 999px;
          color: #0b0f0c;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          transition: 0.25s;
        }

        .area-pill:hover {
          background: #5f9f3a;
          border-color: #5f9f3a;
          color: #5f9f3a;
          transform: translateY(-2px);
        }

        /* =========================
           JOURNAL
        ========================= */

        .journal-section {
          background: #edf5e9;
        }

        .journal-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .journal-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 220px;
          padding: 18px;
          background: #ffffff;
          border: 1px solid #edf5e9;
          border-radius: 16px;
          text-align: left;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .journal-card:hover {
          transform: translateY(-8px);
          border-color: #5f9f3a;
          box-shadow:
            0 20px 40px rgba(11, 42, 74, 0.12);
        }

        .journal-icon {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #edf5e9;
          border: 2px solid #edf5e9;
          font-size: 27px;
          margin-bottom: 14px;
          animation: floatUp 3.5s ease-in-out infinite;
        }

        .journal-meta {
          color: #5f9f3a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .journal-card h3 {
          margin: 0;
          color: #0b0f0c;
          font-family: Georgia, serif;
          font-size: 22px;
          line-height: 1.3;
          text-align: left;
        }

        .journal-card p {
          margin: 14px 0 0;
          color: #4f5a4d;
          font-size: 14px;
          line-height: 1.7;
          text-align: left;
        }

        .journal-read {
          margin-top: auto;
          padding-top: 20px;
          border: 0;
          background: transparent;
          color: #5f9f3a;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          padding-left: 0;
          transition: 0.25s;
        }

        .journal-read:hover {
          color: #5f9f3a;
          transform: translateX(4px);
        }

        .journal-modal-meta {
          color: #5f9f3a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .journal-modal-text {
          color: #4f5a4d;
          line-height: 1.8;
          font-size: 15px;
          margin: 0 0 22px;
        }

        .journal-modal-note {
          padding: 16px;
          margin-bottom: 22px;
          border-left: 4px solid #5f9f3a;
          background: #edf5e9;
          border-radius: 8px;
          color: #4f5a4d;
          line-height: 1.7;
          font-size: 13px;
        }

        /* =========================
           CTA
        ========================= */

        .cta {
          background:
            radial-gradient(
              circle at 90% 20%,
              rgba(225, 191, 169, 0.45),
              transparent 28%
            ),
            linear-gradient(
              120deg,
              #a2afa5,
              #7da186,
              #93bc7b
            );

          color: #ffffff;
          padding: 32px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
        }

        .cta-inner > div:first-child {
          text-align: left;
        }

        .cta h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(33px, 4vw, 54px);
          line-height: 1.1;
          text-align: left;
        }

        .cta p {
          max-width: 650px;
          color: #edf5e9;
          line-height: 1.7;
          margin: 14px 0 0;
          text-align: left;
        }

        .cta-actions {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* =========================
           FAQ
        ========================= */

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          align-items: stretch;
        }

        .faq-item {
          background: #ffffff;
          border: 1px solid #edf5e9;
          border-radius: 13px;
          padding: 16px;
          text-align: left;
          transition: 0.3s;
        }

        .faq-item:hover {
          border-color: #5f9f3a;
          box-shadow:
            0 12px 25px rgba(11, 42, 74, 0.08);
        }

        .faq-item h3 {
          margin: 0 0 9px;
          color: #0b0f0c;
          font-family: Georgia, serif;
          font-size: 18px;
          line-height: 1.4;
          text-align: left;
        }

        .faq-item p {
          margin: 0;
          color: #4f5a4d;
          line-height: 1.7;
          font-size: 13px;
          text-align: left;
        }

        /* =========================
           CONTACT
        ========================= */

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 28px;
          align-items: stretch;
        }

        .contact-card {
          background: #0b0f0c;
          border-radius: 18px;
          padding: 22px;
          color: #ffffff;
          text-align: left;
        }

        .contact-card h2 {
          font-family: Georgia, serif;
          font-size: 34px;
          line-height: 1.2;
          margin: 0 0 12px;
          text-align: left;
        }

        .contact-card > p {
          color: #edf5e9;
          line-height: 1.7;
          text-align: left;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 13px;
          margin-top: 15px;
          text-align: left;
        }

        .contact-item-icon {
          width: 39px;
          height: 39px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          background: rgba(217, 107, 39, 0.18);
          color: #5f9f3a;
          flex-shrink: 0;
        }

        .contact-item strong {
          display: block;
          color: #5f9f3a;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .contact-item span {
          display: block;
          color: #edf5e9;
          line-height: 1.55;
          font-size: 13px;
        }

        .contact-actions {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        /* =========================
           FULL GOOGLE MAP
        ========================= */

        .map-card {
          min-height: 320px;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          border: 1px solid #edf5e9;
          background: #ffffff;
        }

        .map-card iframe {
          width: 100%;
          height: 100%;
          min-height: 320px;
          border: 0;
          display: block;
        }

        /* =========================
           FOOTER
        ========================= */

        .footer {
          background: #0b0f0c;
          color: #edf5e9;
          padding: 28px 0 18px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns:
            1.35fr 0.9fr 1.05fr 1.15fr;
          gap: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid
            rgba(255,255,255,0.1);
          text-align: left;
        }

        .footer h3 {
          color: #5f9f3a;
          font-family: Georgia, serif;
          margin: 0 0 13px;
          font-size: 21px;
          text-align: left;
        }

        .footer p {
          line-height: 1.7;
          font-size: 13px;
          margin: 0;
          text-align: left;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
          text-align: left;
        }

        .footer-links button {
          border: 0;
          background: transparent;
          text-align: left;
          color: #edf5e9;
          padding: 0;
          cursor: pointer;
          font-size: 13px;
        }

        .footer-links button:hover {
          color: #5f9f3a;
        }

        .astroidea {
          color: #5f9f3a;
          font-weight: 800;
        }

        .footer-bottom {
          padding-top: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 12px;
          text-align: left;
        }

        /* =========================
           FLOATING BUTTONS
        ========================= */

        .floating-buttons {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .floating-button {
          width: 51px;
          height: 51px;
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 22px;
          box-shadow:
            0 10px 25px rgba(0,0,0,0.18);
          transition: 0.3s;
        }

        .floating-button:hover {
          transform: translateY(-4px);
        }

        .float-call {
          background: #0b0f0c;
          color: #ffffff;
        }

        .float-whatsapp {
          background: #5f9f3a;
          color: #ffffff;
        }

        /* =========================
           MODAL
        ========================= */

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(3, 20, 43, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(7px);
        }

        .modal {
          width: min(650px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 18px;
          border: 2px solid #5f9f3a;
          padding: 30px;
          text-align: left;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 23px;
        }

        .modal-header h2 {
          margin: 0;
          color: #0b0f0c;
          font-family: Georgia, serif;
          font-size: 32px;
          line-height: 1.2;
          text-align: left;
        }

        .modal-header p {
          margin: 7px 0 0;
          color: #4f5a4d;
          font-size: 13px;
          text-align: left;
        }

        .close-button {
          width: 37px;
          height: 37px;
          border-radius: 50%;
          border: 1px solid #edf5e9;
          background: #edf5e9;
          color: #0b0f0c;
          cursor: pointer;
          font-size: 18px;
          flex-shrink: 0;
        }

        .close-button:hover {
          background: #5f9f3a;
          color: #5f9f3a;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 7px;
          text-align: left;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-group label {
          color: #0b0f0c;
          font-size: 12px;
          font-weight: 800;
          text-align: left;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          border: 1px solid #edf5e9;
          background: #ffffff;
          color: #0b0f0c;
          border-radius: 8px;
          padding: 12px 13px;
          outline: none;
          text-align: left;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #5f9f3a;
          box-shadow:
            0 0 0 3px rgba(217, 107, 39, 0.1);
        }

        .form-group textarea {
          min-height: 105px;
          resize: vertical;
        }

        .form-submit {
          width: 100%;
          margin-top: 17px;
        }

        /* =========================
           ADMIN LOGIN PORTAL
        ========================= */

        .admin-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(3, 15, 31, 0.78);
          backdrop-filter: blur(8px);
        }

        .admin-modal {
          width: min(470px, 100%);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(217, 107, 39, 0.22);
          border-radius: 24px;
          padding: 34px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
        }

        .admin-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          background: #edf5e9;
          color: #0b0f0c;
          font-size: 20px;
          cursor: pointer;
        }

        .admin-close:hover {
          background: #5f9f3a;
          color: #ffffff;
        }

        .admin-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .admin-brand-icon {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #5f9f3a !important;
          border: 0 !important;
          color: #ffffff !important;
          font-size: 25px;
          font-weight: 900;
          font-weight: 900;
          box-shadow: 0 8px 20px rgba(217, 107, 39, 0.25);
        }

        .admin-kicker {
          color: #5f9f3a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .admin-brand-title {
          color: #0b0f0c;
          font-size: 16px;
          font-weight: 800;
        }

        .admin-modal h2 {
          margin: 0;
          color: #0b0f0c;
          font-size: 30px;
          line-height: 1.15;
        }

        .admin-subtitle {
          margin: 10px 0 25px;
          color: #4f5a4d;
          font-size: 14px;
          line-height: 1.6;
        }

        .admin-field {
          margin-bottom: 17px;
        }

        .admin-field label {
          display: block;
          margin-bottom: 7px;
          color: #0b0f0c;
          font-size: 13px;
          font-weight: 800;
        }

        .admin-input-wrap {
          position: relative;
        }

        .admin-input,
        .admin-select {
          width: 100%;
          min-height: 48px;
          border: 1px solid #edf5e9;
          border-radius: 10px;
          outline: none;
          background: #edf5e9;
          color: #17243b;
          padding: 12px 14px;
          transition: 0.2s;
        }

        .admin-input:focus,
        .admin-select:focus {
          border-color: #5f9f3a;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(217, 107, 39, 0.11);
        }

        .admin-input[type="password"],
        .admin-input.has-eye {
          padding-right: 48px;
        }

        .admin-eye {
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border: 0;
          background: transparent;
          color: #4f5a4d;
          cursor: pointer;
          border-radius: 8px;
        }

        .admin-eye:hover {
          background: #edf5e9;
          color: #5f9f3a;
        }

        .admin-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin: 4px 0 22px;
        }

        .remember-device {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4f5a4d;
          font-size: 13px;
          cursor: pointer;
        }

        .remember-device input {
          width: 16px;
          height: 16px;
          accent-color: #5f9f3a;
        }

        .forgot-password {
          border: 0;
          background: transparent;
          color: #5f9f3a;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          padding: 4px 0;
        }

        .forgot-password:hover {
          color: #5f9f3a;
          text-decoration: underline;
        }

        .admin-login-submit {
          width: 100%;
          min-height: 50px;
          border: 0;
          border-radius: 10px;
          background: #5f9f3a;
          color: #ffffff;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 1px;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(217, 107, 39, 0.25);
          transition: 0.25s;
        }

        .admin-login-submit:hover {
          background: #5f9f3a;
          transform: translateY(-2px);
        }

        .admin-security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 17px;
          color: #4f5a4d;
          font-size: 11px;
          text-align: center;
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 1050px) {

          .nav-links {
            gap: 16px;
          }

          .nav-links button {
            font-size: 13px;
          }

          .service-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .advantage-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .journal-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 850px) {

          .topbar {
            display: none;
          }

          .nav {
            min-height: 72px;
          }

          .nav-links {
            display: none;
            position: absolute;
            top: 72px;
            left: 0;
            width: 100%;
            background: #0b0f0c;
            padding: 18px 20px 25px;
            border-bottom: 1px solid
              rgba(217, 107, 39, 0.45);
            box-shadow:
              0 18px 30px rgba(0, 0, 0, 0.2);
            flex-direction: column;
            align-items: stretch;
          }

          .nav-links.mobile-open {
            display: flex;
          }

          .nav-links button {
            color: #ffffff;
            text-align: left;
            padding: 12px 0;
          }

          .nav-links button:hover {
            color: #5f9f3a;
          }

          .admin-nav-button {
            text-align: left !important;
            padding: 12px 0 !important;
            border: 0 !important;
            background: transparent !important;
          }

          .admin-nav-button:hover {
            background: transparent !important;
            transform: none;
          }

          .nav-quote {
            text-align: center !important;
          }

          .menu-button {
            display: block;
          }

          .hero {
            min-height: auto;
          }

          .hero-content {
            padding: 22px 0;
          }

          .about-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .about-image {
            min-height: 320px;
          }

          .trust-grid {
            grid-template-columns: 1fr 1fr;
          }

          .trust-item {
            border-right: 0;
          }

          .cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }

          .map-card {
            min-height: 320px;
          }

          .map-card iframe {
            min-height: 320px;
          }

        }

        @media (max-width: 600px) {
          .hero-extra-matter {
            margin: 16px 0 20px;
          }

          .hero-extra-matter p {
            font-size: 14px;
            line-height: 1.65;
          }

          .hero-highlights {
            flex-direction: column;
            gap: 8px;
          }



          .container,
          .nav,
          .hero-content {
            width: min(100% - 28px, 1240px);
          }

          .hero h1 {
            font-size: 46px;
            letter-spacing: -1px;
          }

          .hero p {
            font-size: 15px;
          }

          .section {
            padding: 26px 0;
          }

          .service-grid,
          .advantage-grid,
          .process-grid,
          .trust-grid,
          .journal-grid {
            grid-template-columns: 1fr;
          }

          .about-points {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }

          .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .floating-buttons {
            right: 12px;
            bottom: 12px;
          }

          .floating-button {
            width: 47px;
            height: 47px;
          }

          .modal {
            padding: 18px;
          }

          .hero-actions {
            align-items: stretch;
          }

          .hero-actions .btn {
            width: 100%;
          }

          .home-location-button {
            width: 100%;
          }

          .hero-contact {
            gap: 18px;
          }

        }

        @media (max-width: 1100px) {

          .sa-cities-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

        }

        @media (max-width: 760px) {

          .sa-services-page {
            padding: 24px 16px 30px;
          }

          .sa-cities-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .sa-city-card {
            min-height: 230px;
            padding: 18px;
          }

          .sa-city-card h2 {
            font-size: 21px;
          }

        }

        @media (max-width: 520px) {

          .sa-cities-grid {
            grid-template-columns: 1fr;
          }

          .sa-city-card {
            min-height: 0;
          }

          .sa-location {
            min-height: 0;
          }

        }

        @media (prefers-reduced-motion: reduce) {

          html {
            scroll-behavior: auto;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }

          .blink-text {
            animation: none;
          }

          .journal-icon {
            animation: none;
          }

        }

     

        /* =====================================================
           FINAL BLACK + LEAF GREEN THEME / ALIGNMENT FIX
        ===================================================== */
        :root {
          --black: #0b0f0c;
          --black-soft: #111711;
          --leaf: #5f9f3a;
          --leaf-dark: #3f7425;
          --leaf-light: #edf5e9;
          --paper: #f7faf5;
          --line: #d7e3d1;
          --text: #1a2119;
          --muted: #5f6b5c;
        }

        html,
        body,
        #root {
          width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
        }

        body {
          background: var(--paper) !important;
          color: var(--text);
        }

        .app {
          background: var(--paper) !important;
          color: var(--text) !important;
        }

        .topbar,
        .header,
        .trust-strip,
        .section.dark,
        .services-section,
        .footer {
          background: var(--black) !important;
        }

        .topbar strong,
        .logo-text span,
        .nav-links button:hover,
        .eyebrow,
        .dark .eyebrow,
        .hero h1 span,
        .hero-contact-item strong,
        .trust-item strong,
        .service-link,
        .footer-column a:hover,
        .footer-column button:hover,
        .footer-bottom a {
          color: var(--leaf) !important;
        }

        .logo-icon,
        .nav-quote,
        .btn-primary,
        .service-link-button,
        .admin-nav-button:hover,
        .add-location-button,
        .submit-button,
        .quote-submit,
        .mobile-quote-button {
          background: var(--leaf) !important;
          border-color: var(--leaf) !important;
        }

        .btn-primary:hover,
        .nav-quote:hover {
          background: var(--leaf-dark) !important;
          border-color: var(--leaf-dark) !important;
        }

        .hero {
          background:
            radial-gradient(circle at 82% 28%, rgba(95,159,58,0.18), transparent 26%),
            linear-gradient(135deg, #080b08 0%, #0b0f0c 58%, #162214 100%) !important;
        }

        .hero::before {
          border-color: rgba(95,159,58,0.18) !important;
        }

        .hero::after {
          background: rgba(95,159,58,0.10) !important;
        }

        .hero-badge {
          border-color: rgba(95,159,58,0.55) !important;
          background: rgba(95,159,58,0.12) !important;
        }

        .hero-extra-matter {
          max-width: 820px;
          margin: 20px 0 22px;
          padding-left: 18px;
          border-left: 3px solid var(--leaf);
        }

        .hero-extra-matter p,
        .hero-service-note {
          text-align: left !important;
          text-justify: inter-word;
        }

        .hero-service-note {
          margin-top: 10px !important;
          color: #dce8d8 !important;
          font-size: 14px !important;
        }

        .hero-highlights span::first-letter {
          color: var(--leaf);
        }

        .section {
          background: var(--paper) !important;
        }

        .section.alt,
        .section.faq-section {
          background: var(--leaf-light) !important;
        }

        .section-heading h2,
        .service-card h3,
        .category-card h3,
        .contact-card h3,
        .about-content h3,
        .process-card h3,
        .advantage-card h3,
        .guide-card h3,
        .faq-title h2 {
          color: var(--black-soft) !important;
        }

        .services-section .section-heading h2,
        .services-section .section-heading p,
        .dark .section-heading h2,
        .dark .section-heading p {
          color: #c03a3a !important;
        }

        .service-card,
        .advantage-card,
        .process-card,
        .guide-card,
        .category-card,
        .contact-card,
        .route-card,
        .faq-item,
        .quote-box,
        .admin-box,
        .service-area-card {
          border-color: var(--line) !important;
        }

        .service-card:hover,
        .advantage-card:hover,
        .process-card:hover,
        .guide-card:hover,
        .category-card:hover,
        .route-card:hover {
          border-color: rgba(95,159,58,0.65) !important;
        }

        .point,
        .about-points .point,
        .service-link,
        .process-number,
        .advantage-icon,
        .guide-category,
        .location-price,
        .location-distance,
        .check-item,
        .faq-item.active button {
          color: var(--leaf) !important;
        }

        .about-image {
          border-color: var(--leaf-light) !important;
          box-shadow: 0 20px 45px rgba(11,15,12,0.16) !important;
        }

        .contact,
        .cta-section,
        .quote-estimate-box {
          margin: 18px 0; padding: 18px; border-radius: 14px;
          background: #edf5e9; border: 1px solid #6baa45; color: #000;
          display: flex; flex-direction: column; gap: 5px;
        }
        .quote-estimate-box span { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #3f7425; }
        .quote-estimate-box strong { font-size: 30px; line-height: 1.1; color: #000; }
        .quote-estimate-box small { font-size: 12px; line-height: 1.55; color: #3d463a; }

        .quote-modal,
        .admin-modal {
          background: var(--black) !important;
        }

        .footer-bottom {
          border-top-color: rgba(95,159,58,0.35) !important;
        }

        /* =====================================================
           MATTER ALIGNMENT
        ===================================================== */
        .section-heading,
        .about-content,
        .service-card,
        .advantage-card,
        .process-card,
        .guide-card,
        .category-card,
        .contact-card,
        .route-card,
        .faq-list,
        .footer-column,
        .footer-brand {
          min-width: 0;
        }

        .section-heading p,
        .about-content p,
        .service-card p,
        .advantage-card p,
        .process-card p,
        .guide-card p,
        .category-card p,
        .contact-card p,
        .route-card p,
        .faq-answer,
        .footer-brand p,
        .footer-column p {
          margin-top: 10px;
          line-height: 1.75;
          overflow-wrap: anywhere;
          word-break: normal;
          text-align: left;
        }

        .section-heading h2,
        .about-content h3,
        .service-card h3,
        .advantage-card h3,
        .process-card h3,
        .guide-card h3,
        .category-card h3,
        .contact-card h3 {
          margin-top: 0;
          margin-bottom: 0;
          line-height: 1.2;
          overflow-wrap: break-word;
          word-break: normal;
        }

        .service-grid,
        .advantage-grid,
        .process-grid,
        .guide-grid,
        .category-grid,
        .route-grid,
        .contact-grid,
        .about-grid {
          width: 100%;
          align-items: stretch;
        }

        .service-card,
        .advantage-card,
        .process-card,
        .guide-card,
        .category-card,
        .route-card,
        .contact-card {
          height: 100%;
        }

        .service-card,
        .advantage-card,
        .process-card,
        .guide-card,
        .category-card {
          display: flex;
          flex-direction: column;
        }

        .service-card p,
        .advantage-card p,
        .process-card p,
        .guide-card p,
        .category-card p {
          flex: 1;
        }

        .hero-main-matter,
        .hero-extra-matter p,
        .hero-service-note {
          max-width: 760px !important;
          text-align: left !important;
        }

        .hero-contact-item {
          min-width: 150px;
          line-height: 1.55;
        }

        .hero-actions,
        .hero-contact,
        .hero-highlights {
          align-items: flex-start;
        }

        .container,
        .nav,
        .hero-content {
          width: min(1240px, calc(100% - 40px));
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 850px) {
          .container,
          .nav,
          .hero-content {
            width: min(100% - 32px, 1240px);
          }

          .hero {
            min-height: 0;
          }

          .hero-content {
            padding: 48px 0 42px;
          }

          .hero h1 {
            font-size: clamp(40px, 12vw, 62px);
            letter-spacing: -1px;
          }

          .hero-main-matter,
          .hero-extra-matter,
          .hero-service-note {
            max-width: 100% !important;
          }

          .hero-actions .btn {
            width: 100%;
          }

          .hero-contact {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .hero-contact-item {
            width: 100%;
          }

          .section-heading,
          .about-content,
          .service-card,
          .advantage-card,
          .process-card,
          .guide-card,
          .category-card,
          .contact-card {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .container,
          .nav,
          .hero-content {
            width: calc(100% - 28px);
          }

          .hero-extra-matter {
            padding-left: 14px;
          }

          .hero h1 {
            font-size: clamp(36px, 11vw, 52px);
            line-height: 1.05;
          }

          .hero-main-matter {
            font-size: 16px !important;
            line-height: 1.7 !important;
          }

          .hero-extra-matter p,
          .hero-service-note,
          .section-heading p,
          .about-content p,
          .service-card p,
          .advantage-card p,
          .process-card p,
          .guide-card p,
          .category-card p,
          .contact-card p,
          .faq-answer,
          .footer-brand p,
          .footer-column p {
            font-size: 14px;
            line-height: 1.7;
          }
        }

      `}</style>

      <div className="app">

        {/* TOP BAR */}

        <div className="topbar">

          <div className="topbar-inner">

            <span>

              <strong>
                Speedway Worldwide Express
              </strong>{" "}

              — Moving made organised and simple.

            </span>

            <span>

              📍 Mukarampura, Karimnagar
              &nbsp; | &nbsp;
              📞 {company.phone}

            </span>

          </div>

        </div>

        {/* HEADER */}

        <header className="header">

          <nav className="nav">

            <div
              className="logo"
              onClick={() =>
                scrollToSection("home")
              }
            >

              <div className="logo-icon">
                S
              </div>

              <div className="logo-text">

                <strong>
                  SPEEDWAY
                </strong>

                <span>
                  Packers & Movers
                </span>

              </div>

            </div>

            <button
              className="menu-button"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
            >
              {mobileMenu ? "✕" : "☰"}
            </button>

            <div
              className={`nav-links ${
                mobileMenu
                  ? "mobile-open"
                  : ""
              }`}
            >

              <button
                onClick={() =>
                  scrollToSection("home")
                }
              >
                Home
              </button>

              <button
                onClick={() =>
                  scrollToSection("about")
                }
              >
                About
              </button>

              <button
                onClick={() =>
                  scrollToSection("services")
                }
              >
                Services
              </button>

              <button
                onClick={() =>
                  scrollToSection("process")
                }
              >
                Process
              </button>

              <button
                onClick={() =>
                  scrollToSection("areas")
                }
              >
               
              
                Journal
              </button>

              <button
                onClick={() =>
                  scrollToSection("contact")
                }
              >
                Contact
              </button>

              <button
                className="admin-nav-button"
                type="button"
                onClick={openAdminPortal}
              >
                Admin Login
              </button>

              <button
                className="nav-quote"
                onClick={() =>
                  setShowQuote(true)
                }
              >
                Get Free Quote
              </button>

            </div>

          </nav>

        </header>

      {/* =====================================================
    HOME SECTION - COMPLETE
===================================================== */}

<style>{`

/* =====================================================
   HOME FULL WIDTH
===================================================== */

#home.hero {
  width: 100%;
  max-width: none;
  overflow: hidden;
  box-sizing: border-box;
}

#home .hero-content {
  width: calc(100% - 30px) !important;
  max-width: none !important;
  margin-left: 15px !important;
  margin-right: 15px !important;
  box-sizing: border-box;
}

/* =====================================================
   TWO COLUMN HOME LAYOUT
===================================================== */

#home .hero-main-layout {
  width: 100%;

  display: grid;

  grid-template-columns:
    minmax(0, 1.25fr)
    minmax(360px, 0.75fr);

  gap: 35px;

  align-items: stretch;
}

#home .hero-left-content {
  width: 100%;
  min-width: 0;
}

#home .hero-right-content {
  width: 100%;
  min-width: 0;

  display: flex;
  align-items: stretch;
}

/* =====================================================
   LEFT SIDE CONTENT
===================================================== */

#home .hero-badge {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
}

#home h1 {
  width: 100%;
  max-width: none !important;
  box-sizing: border-box;
}

#home .hero-main-matter {
  width: 100% !important;
  max-width: none !important;
  box-sizing: border-box;
}

#home .hero-extra-matter {
  width: 100% !important;
  max-width: none !important;
  box-sizing: border-box;
}

#home .hero-extra-matter p {
  width: 100% !important;
  max-width: none !important;
  box-sizing: border-box;
}

#home .hero-service-note {
  width: 100% !important;
  max-width: none !important;
  box-sizing: border-box;
}

/* =====================================================
   HIGHLIGHTS
===================================================== */

#home .hero-highlights {
  width: 100% !important;
  max-width: none !important;

  display: flex !important;

  flex-wrap: wrap !important;

  gap: 10px;

  box-sizing: border-box;
}

/* =====================================================
   BUTTONS
===================================================== */

#home .hero-actions {
  width: 100% !important;
  max-width: none !important;

  display: flex !important;

  flex-wrap: wrap !important;

  gap: 12px;

  box-sizing: border-box;
}

/* =====================================================
   RIGHT INFORMATION PANEL
===================================================== */

#home .hero-info-panel {
  width: 100%;

  min-height: 100%;

  padding: 30px;

  box-sizing: border-box;

  border-radius: 22px;

  background:
    linear-gradient(
      145deg,
      rgba(95,159,58,0.18),
      rgba(11,15,12,0.95)
    );

  border:
    1px solid
    rgba(95,159,58,0.45);

  box-shadow:
    0 18px 45px
    rgba(0,0,0,0.20);

  position: relative;

  overflow: hidden;
}

/* Decorative circle */

#home .hero-info-panel::before {
  content: "";

  position: absolute;

  width: 220px;
  height: 220px;

  border-radius: 50%;

  right: -80px;
  top: -80px;

  background:
    rgba(95,159,58,0.12);

  pointer-events: none;
}

/* =====================================================
   PANEL LABEL
===================================================== */

#home .hero-panel-label {
  display: inline-block;

  padding: 7px 13px;

  border-radius: 30px;

  background:
    rgba(95,159,58,0.16);

  color: #9ed37e;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 1.2px;

  margin-bottom: 14px;
}

/* =====================================================
   PANEL HEADING
===================================================== */

#home .hero-info-panel h2 {
  margin: 0 0 12px;

  color: #ffffff;

  font-size:
    clamp(28px, 3vw, 42px);

  line-height: 1.1;
}

#home .hero-info-panel h2 span {
  color: #79b957;
}

/* =====================================================
   PANEL DESCRIPTION
===================================================== */

#home .hero-info-panel > p {
  color: #d8e2d4;

  font-size: 15px;

  line-height: 1.75;

  margin: 0 0 22px;
}

/* =====================================================
   SERVICE CARDS
===================================================== */

#home .hero-panel-services {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 12px;

  margin-top: 18px;
}

#home .hero-panel-service {
  padding: 15px;

  border-radius: 14px;

  background:
    rgba(255,255,255,0.055);

  border:
    1px solid
    rgba(255,255,255,0.08);

  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

#home .hero-panel-service:hover {
  transform:
    translateY(-4px);

  background:
    rgba(95,159,58,0.14);
}

#home .hero-panel-service-icon {
  font-size: 23px;

  margin-bottom: 7px;
}

#home .hero-panel-service strong {
  display: block;

  color: #a51b1b;

  font-size: 14px;

  margin-bottom: 4px;
}

#home .hero-panel-service span {
  display: block;

  color: #b9c8b4;

  font-size: 12px;

  line-height: 1.5;
}

/* =====================================================
   LOCATION MESSAGE
===================================================== */

#home .home-location-message {
  width: 100%;

  max-width: none;

  box-sizing: border-box;
}

/* =====================================================
   TRUCK ANIMATION
===================================================== */

#home .speedway-truck-animation {
  position: relative !important;

  width: 100% !important;

  max-width: none !important;

  height: 115px !important;

  margin:
    25px 0 20px !important;

  overflow: hidden !important;

  box-sizing: border-box !important;
}

#home .speedway-road {
  position: absolute !important;

  left: 0 !important;

  right: 0 !important;

  bottom: 15px !important;

  width: 100% !important;

  height: 5px !important;

  box-sizing: border-box !important;
}

#home .speedway-truck {
  position: absolute !important;

  left: -190px !important;

  bottom: 20px !important;

  z-index: 10 !important;

  animation:
    speedwayTruckMove
    8s
    linear
    infinite !important;

  will-change:
    transform;
}

/* =====================================================
   TRUCK LEFT TO RIGHT
===================================================== */

@keyframes speedwayTruckMove {

  0% {
    transform:
      translateX(0);
  }

  100% {
    transform:
      translateX(
        calc(100vw + 420px)
      );
  }

}

/* =====================================================
   CONTACT INFORMATION
===================================================== */

#home .hero-contact {
  width: 100% !important;

  max-width: none !important;

  display: grid !important;

  grid-template-columns:
    repeat(3, 1fr) !important;

  box-sizing: border-box;
}

#home .hero-contact-item {
  width: 100%;

  box-sizing: border-box;
}

/* =====================================================
   TRUST STRIP
===================================================== */

.trust-strip {
  width: 100%;

  box-sizing: border-box;
}

.trust-strip .trust-grid {
  width: calc(100% - 30px) !important;

  max-width: none !important;

  margin-left: 15px !important;

  margin-right: 15px !important;

  box-sizing: border-box;
}

/* =====================================================
   LARGE DESKTOP
===================================================== */

@media (min-width: 1200px) {

  #home .hero-content {
    width:
      calc(100% - 20px) !important;

    margin-left:
      10px !important;

    margin-right:
      10px !important;
  }

  .trust-strip .trust-grid {
    width:
      calc(100% - 20px) !important;

    margin-left:
      10px !important;

    margin-right:
      10px !important;
  }

}

/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1050px) {

  #home .hero-main-layout {
    grid-template-columns:
      1fr;
  }

  #home .hero-right-content {
    margin-top: 10px;
  }

}

/* =====================================================
   SMALL TABLET
===================================================== */

@media (max-width: 850px) {

  #home .hero-content {
    width:
      calc(100% - 20px) !important;

    margin-left:
      10px !important;

    margin-right:
      10px !important;
  }

  #home .hero-contact {
    grid-template-columns:
      1fr !important;
  }

  #home .hero-contact-item {
    width: 100% !important;
  }

  #home .speedway-truck-animation {
    width: 100% !important;

    height: 100px !important;
  }

  #home .speedway-truck {
    left: -180px !important;

    animation-duration:
      6s !important;
  }

  .trust-strip .trust-grid {
    width:
      calc(100% - 20px) !important;

    margin-left:
      10px !important;

    margin-right:
      10px !important;
  }

}

/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 700px) {

  #home .hero-content {
    width:
      calc(100% - 14px) !important;

    margin-left:
      7px !important;

    margin-right:
      7px !important;
  }

  #home .hero-panel-services {
    grid-template-columns:
      1fr;
  }

  #home .hero-info-panel {
    padding: 23px;
  }

  #home .hero-highlights {
    flex-direction:
      column !important;
  }

  #home .hero-actions {
    flex-direction:
      column !important;
  }

  #home .hero-actions button {
    width:
      100% !important;
  }

  .trust-strip .trust-grid {
    width:
      calc(100% - 14px) !important;

    margin-left:
      7px !important;

    margin-right:
      7px !important;
  }

}

/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 500px) {

  #home .hero-info-panel h2 {
    font-size: 28px;
  }

  #home .speedway-truck-animation {
    height: 90px !important;
  }

}

`}</style>


{/* =====================================================
    HERO
===================================================== */}

<section
  id="home"
  className="hero"
>

  <div className="hero-content reveal show">

    {/* =================================================
        TWO COLUMN MAIN AREA
    ================================================= */}

    <div className="hero-main-layout">

      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="hero-left-content">

        {/* BADGE */}

        <div className="hero-badge blink-text">

          🚚 PACKING • MOVING • RELOCATION

        </div>


        {/* HEADING */}

        <h1 className="blink-text">

          Move with{" "}

          <span>
            confidence.
          </span>

          <br />

          Settle with ease.

        </h1>


        {/* MAIN MATTER */}

        <p className="blink-text hero-main-matter">

          Professional packing and moving support.

          <br />

          Careful handling for homes and offices.

          <br />

          Reliable relocation assistance across
          Karimnagar and beyond.

        </p>


        {/* EXTRA MATTER */}

        <div className="hero-extra-matter reveal show">

          <p>

            From household shifting and office relocation
            to packing, loading and transportation,
            Speedway Worldwide Express helps organise
            every important step of your move from pickup
            to final delivery.

          </p>


          <p className="hero-service-note">

            Whether you are moving a home, office,
            shop or vehicle, our relocation support
            is designed to keep the process organised,
            clear and convenient from beginning to end.

          </p>


          {/* HIGHLIGHTS */}

          <div className="hero-highlights">

            <span>
              ✓ Careful Packing
            </span>

            <span>
              ✓ Planned Transportation
            </span>

            <span>
              ✓ Door-to-Door Support
            </span>

            <span>
              ✓ Local & Intercity Moves
            </span>

          </div>

        </div>


        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div className="hero-actions">

          <button
            className="btn btn-primary"
            onClick={() =>
              setShowQuote(true)
            }
          >

            📦 Get Free Quote

          </button>


          <button
            className="btn btn-light"
            onClick={openWhatsApp}
          >

            💬 WhatsApp Us

          </button>


          <button
            className="btn btn-light home-location-button"
            onClick={getUserLocation}
          >

            📍 Use My Location

          </button>

        </div>


        {/* LOCATION MESSAGE */}

        {locationMessage && (

          <div className="home-location-message">

            {locationMessage}

            {userLocation && (

              <span>

                {" "}

                (
                {userLocation.latitude.toFixed(5)}
                ,
                {" "}
                {userLocation.longitude.toFixed(5)}
                )

              </span>

            )}

          </div>

        )}

      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="hero-right-content">

        <div className="hero-info-panel">

          {/* LABEL */}

          <div className="hero-panel-label">

            SPEEDWAY WORLDWIDE EXPRESS

          </div>


          {/* TITLE */}

          <h2>

            Moving made

            <br />

            <span>
              simple & organised.
            </span>

          </h2>


          {/* DESCRIPTION */}

          <p>

            From the first call to the final delivery,
            Speedway Worldwide Express provides organised
            relocation support for homes, offices and
            businesses.

          </p>


          {/* =================================================
              SERVICE CARDS
          ================================================= */}

          <div className="hero-panel-services">

            {/* HOME SHIFTING */}

            <div className="hero-panel-service">

              <div className="hero-panel-service-icon">
                🏠
              </div>

              <strong>
                Home Shifting
              </strong>

              <span>

                Careful packing, loading and household
                relocation support.

              </span>

            </div>


            {/* OFFICE RELOCATION */}

            <div className="hero-panel-service">

              <div className="hero-panel-service-icon">
                🏢
              </div>

              <strong>
                Office Relocation
              </strong>

              <span>

                Organised movement of office items,
                equipment and furniture.

              </span>

            </div>


            {/* PACKING */}

            <div className="hero-panel-service">

              <div className="hero-panel-service-icon">
                📦
              </div>

              <strong>
                Packing Support
              </strong>

              <span>

                Structured packing and handling for
                important household items.

              </span>

            </div>


            {/* TRANSPORTATION */}

            <div className="hero-panel-service">

              <div className="hero-panel-service-icon">
                🚚
              </div>

              <strong>
                Transportation
              </strong>

              <span>

                Planned transportation support from
                pickup to destination.

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>


    {/* =================================================
        FULL WIDTH TRUCK
    ================================================= */}

    <div
      className="speedway-truck-animation"
      aria-label="Speedway delivery truck animation"
    >

      <div className="speedway-truck">

        <div className="speedway-trailer" />

        <div className="speedway-cabin">

          <div className="speedway-window" />

          <div className="speedway-bumper" />

        </div>

        <div className="speedway-wheel one" />

        <div className="speedway-wheel two" />

      </div>

      <div className="speedway-road" />

    </div>


    {/* =================================================
        CONTACT INFORMATION
    ================================================= */}

    <div className="hero-contact">

      <div className="hero-contact-item">

        <strong>
          Location
        </strong>

        <span>

          Mukarampura,
          <br />
          Karimnagar

        </span>

      </div>


      <div className="hero-contact-item">

        <strong>
          Call
        </strong>

        <span>
          {company.phone}
        </span>

      </div>


      <div className="hero-contact-item">

        <strong>
          Support
        </strong>

        <span>

          Local & Intercity
          <br />
          Moves

        </span>

      </div>

    </div>

  </div>

</section>


{/* =====================================================
    TRUST STRIP
===================================================== */}

<section className="trust-strip">

  <div className="container trust-grid">

    {/* SAFE PACKING */}

    <div className="trust-item">

      <div className="trust-icon">
        📦
      </div>

      <div>

        <strong>
          Safe Packing
        </strong>

        <span>
          Organised handling
        </span>

      </div>

    </div>


    {/* MOVING SUPPORT */}

    <div className="trust-item">

      <div className="trust-icon">
        🚚
      </div>

      <div>

        <strong>
          Moving Support
        </strong>

        <span>
          Planned transportation
        </span>

      </div>

    </div>


    {/* DOOR TO DOOR */}

    <div className="trust-item">

      <div className="trust-icon">
        📍
      </div>

      <div>

        <strong>
          Door-to-Door
        </strong>

        <span>
          Pickup to delivery
        </span>

      </div>

    </div>


    {/* EASY CONTACT */}

    <div className="trust-item">

      <div className="trust-icon">
        📞
      </div>

      <div>

        <strong>
          Easy Contact
        </strong>

        <span>
          Call or WhatsApp
        </span>

      </div>

    </div>

  </div>

</section>
{/* =====================================================
    ABOUT — TIGHT PACKERS & MOVERS VERSION
===================================================== */}

<section
  id="about"
  className="speedway-about-section"
>
  <style>{`
    /* =================================================
       MAIN ABOUT SECTION
    ================================================= */

    .speedway-about-section {
      width: 100%;
      margin: 0;
      padding: 32px 5% 34px 0;
      box-sizing: border-box;
      background: linear-gradient(
        135deg,
        #e8f6e6 0%,
        #dcefd9 50%,
        #eef8ec 100%
      );
      color: #111;
      overflow: hidden;
    }

    .speedway-about-container {
      width: 100%;
      max-width: 1320px;
      margin: 0 auto 0 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 38px;
      align-items: stretch;
    }

    /* =================================================
       LEFT IMAGE
    ================================================= */

    .speedway-about-image {
      width: 100%;
      height: 430px;
      min-height: 430px;
      border-radius: 0 18px 18px 0;
      overflow: hidden;

      background:
        linear-gradient(
          135deg,
          rgba(79,143,82,.12),
          rgba(255,255,255,.04)
        ),
        url("https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1000&q=85")
        center / cover no-repeat;

      box-shadow: 0 10px 25px rgba(40,80,40,.12);
    }

    /* =================================================
       RIGHT CONTENT
    ================================================= */

    .speedway-about-content {
      height: 430px;
      min-height: 430px;
      box-sizing: border-box;

      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: 0 5% 0 0;
    }

    .speedway-about-eyebrow {
      margin: 0 0 5px;

      color: #4f8f52;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .speedway-about-content h3 {
      margin: 0 0 10px;
      padding: 0;

      color: #111;
      font-size: clamp(27px, 3vw, 40px);
      line-height: 1.05;
      font-weight: 800;
    }

    .speedway-about-content h3 span {
      color: #4f8f52;
    }

    /* =================================================
       PARAGRAPHS
    ================================================= */

    .speedway-about-description {
      width: 100%;
      max-width: 620px;
      margin: 0;
      padding: 0;
    }

    .speedway-about-description p {
      margin: 0;
      padding: 0;

      color: #293329;
      font-size: 13.5px;
      line-height: 1.48;
      font-weight: 400;
      text-align: left;
    }

    .speedway-about-description p + p {
      margin-top: 6px;
    }

    /* =================================================
       PACKERS & MOVERS TRUCK
    ================================================= */

    .speedway-about-truck-animation {
      position: relative;
      width: 100%;
      height: 67px;
      margin: 7px 0 5px;
      overflow: hidden;
    }

    .speedway-about-truck-road {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 4px;

      height: 2px;
      background: #4f8f52;
      opacity: .7;
      border-radius: 20px;
    }

    /* MOVING TRUCK */

    .speedway-about-moving-truck {
      position: absolute;

      left: -175px;
      bottom: 6px;

      width: 155px;
      height: 52px;

      animation:
        speedwayAboutMovingTruck
        8s
        linear
        infinite;
    }

    /* =================================================
       TRUCK BOX
    ================================================= */

    .speedway-about-truck-box {
      position: absolute;

      left: 0;
      bottom: 7px;

      width: 108px;
      height: 43px;

      background: #4f8f52;

      border-radius: 4px 3px 3px 3px;

      box-shadow:
        inset 0 -5px 0 rgba(0,0,0,.08);
    }

    /* TOP LINE */

    .speedway-about-truck-line {
      position: absolute;

      left: 8px;
      right: 8px;
      top: 7px;

      height: 2px;

      background: rgba(255,255,255,.55);
    }

    /* MOVERS */

    .speedway-about-truck-brand {
      position: absolute;

      left: 9px;
      top: 14px;

      color: #fff;

      font-size: 10px;
      font-weight: 900;

      letter-spacing: 1px;
    }

    /* PACKERS */

    .speedway-about-truck-brand.second {
      top: 27px;

      font-size: 8px;
      letter-spacing: 1.5px;
    }

    /* =================================================
       TRUCK CAB
    ================================================= */

    .speedway-about-truck-cab {
      position: absolute;

      right: 0;
      bottom: 7px;

      width: 48px;
      height: 31px;

      background: #111;

      border-radius: 4px 9px 4px 3px;
    }

    /* WINDSHIELD */

    .speedway-about-truck-windshield {
      position: absolute;

      left: 7px;
      top: 5px;

      width: 25px;
      height: 14px;

      background: #dff1df;

      border-radius: 3px 7px 2px 2px;

      transform: skew(-8deg);
    }

    /* CAB FRONT */

    .speedway-about-truck-cab::after {
      content: "";

      position: absolute;

      right: 4px;
      top: 19px;

      width: 4px;
      height: 7px;

      background: #4f8f52;

      border-radius: 2px;
    }

    /* HEADLIGHT */

    .speedway-about-truck-headlight {
      position: absolute;

      right: 0;
      bottom: 9px;

      width: 5px;
      height: 6px;

      background: #e9f6d8;

      border-radius: 2px 0 0 2px;
    }

    /* =================================================
       TRUCK WHEELS
    ================================================= */

    .speedway-about-truck-wheel {
      position: absolute;

      bottom: 0;

      width: 17px;
      height: 17px;

      background: #111;

      border: 3px solid #fff;

      border-radius: 50%;

      box-sizing: border-box;

      animation:
        speedwayAboutTruckWheelSpin
        .55s
        linear
        infinite;

      z-index: 5;
    }

    .speedway-about-truck-wheel.front {
      right: 13px;
    }

    .speedway-about-truck-wheel.back {
      left: 17px;
    }

    .speedway-about-truck-wheel div {
      position: absolute;

      width: 5px;
      height: 5px;

      left: 3px;
      top: 3px;

      border-radius: 50%;

      background: #4f8f52;
    }

    /* =================================================
       TRUCK MOVEMENT
    ================================================= */

    @keyframes speedwayAboutMovingTruck {

      0% {
        left: -175px;
      }

      100% {
        left: calc(100% + 30px);
      }

    }

    /* =================================================
       WHEEL ROTATION
    ================================================= */

    @keyframes speedwayAboutTruckWheelSpin {

      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }

    }

    /* =================================================
       FEATURES
    ================================================= */

    .speedway-about-features {
      display: grid;

      grid-template-columns: 1fr 1fr;

      column-gap: 20px;
      row-gap: 3px;

      margin: 0;
      padding: 0;
    }

    .speedway-about-feature {
      color: #111;

      font-size: 12.5px;
      line-height: 1.3;

      font-weight: 600;

      padding: 2px 0;
    }

    .speedway-about-feature span {
      color: #4f8f52;

      font-weight: 900;

      margin-right: 4px;
    }

    /* =================================================
       TABLET
    ================================================= */

    @media (max-width: 950px) {

      .speedway-about-section {
        padding: 28px 5% 30px;
      }

      .speedway-about-container {
        grid-template-columns: 1fr;

        gap: 22px;

        margin: 0 auto;
      }

      .speedway-about-image {
        height: 330px;
        min-height: 330px;

        border-radius: 14px;
      }

      .speedway-about-content {
        height: auto;
        min-height: 0;

        padding: 0;
      }

    }

    /* =================================================
       MOBILE
    ================================================= */

    @media (max-width: 600px) {

      .speedway-about-section {
        padding: 25px 5% 28px;
      }

      .speedway-about-image {
        height: 245px;
        min-height: 245px;

        border-radius: 12px;
      }

      .speedway-about-content h3 {
        font-size: 28px;

        line-height: 1.08;

        margin-bottom: 8px;
      }

      .speedway-about-description p {
        font-size: 13px;

        line-height: 1.46;
      }

      .speedway-about-truck-animation {
        height: 57px;

        margin: 5px 0;
      }

      .speedway-about-moving-truck {
        transform: scale(.88);

        transform-origin: left bottom;
      }

      .speedway-about-features {
        column-gap: 12px;

        row-gap: 2px;
      }

      .speedway-about-feature {
        font-size: 11.5px;
      }

    }
  `}</style>


  <div className="speedway-about-container">

    {/* =================================================
        LEFT IMAGE
    ================================================= */}

    <div className="speedway-about-image" />


    {/* =================================================
        RIGHT CONTENT
    ================================================= */}

    <div className="speedway-about-content">

      <div className="speedway-about-eyebrow">
        ABOUT US
      </div>


      <h3>
        A safer and easier way to
        <span> handle your move.</span>
      </h3>


      <div className="speedway-about-description">

        <p>
          Moving your home or workplace can involve many small details.
          SPEEDWAY And Movers is here to make those steps easier with
          organised packing, loading, transportation and unloading support.
        </p>

        <p>
          Based in Mukarampura, Karimnagar, we provide moving assistance
          for local requirements as well as relocation needs beyond the city.
        </p>

      </div>


      {/* =================================================
          MOVING PACKERS & MOVERS TRUCK
      ================================================= */}

      <div
        className="speedway-about-truck-animation"
        aria-label="Packers and movers truck animation"
      >

        <div className="speedway-about-moving-truck">

          {/* TRUCK BOX */}

          <div className="speedway-about-truck-box">

            <div className="speedway-about-truck-brand">
              MOVERS
            </div>

            <div className="speedway-about-truck-brand second">
              PACKERS
            </div>

            <div className="speedway-about-truck-line" />

          </div>


          {/* TRUCK CAB */}

          <div className="speedway-about-truck-cab">

            <div className="speedway-about-truck-windshield" />

            <div className="speedway-about-truck-headlight" />

          </div>


          {/* WHEELS */}

          <div className="speedway-about-truck-wheel front">
            <div />
          </div>

          <div className="speedway-about-truck-wheel back">
            <div />
          </div>

        </div>


        {/* ROAD */}

        <div className="speedway-about-truck-road" />

      </div>


      {/* =================================================
          FEATURES
      ================================================= */}

      <div className="speedway-about-features">

        <div className="speedway-about-feature">
          <span>✓</span>
          Household Relocation
        </div>

        <div className="speedway-about-feature">
          <span>✓</span>
          Office Shifting
        </div>

        <div className="speedway-about-feature">
          <span>✓</span>
          Packing Assistance
        </div>

        <div className="speedway-about-feature">
          <span>✓</span>
          Loading & Unloading
        </div>

        <div className="speedway-about-feature">
          <span>✓</span>
          Local Moving
        </div>

        <div className="speedway-about-feature">
          <span>✓</span>
          Intercity Moving
        </div>

      </div>

    </div>

  </div>

</section>
{/* =====================================================
    HOW OUR TEAM WORKS — FULL ANIMATED SECTION
===================================================== */}
<section className="speedway-teamwork-section">

  <style>{`

    .speedway-teamwork-section {
      width: 100%;
      min-height: 520px;
      margin: 0;
      padding: 25px 0 0;
      overflow: hidden;
      background:
        linear-gradient(
          180deg,
          #e8f7dc 0%,
          #d8efc8 55%,
          #c7e8b4 100%
        );
      box-sizing: border-box;
      position: relative;
      font-family: Arial, sans-serif;
    }

    .speedway-teamwork-title {
      text-align: center;
      margin: 0 0 8px;
      position: relative;
      z-index: 20;
    }

    .speedway-teamwork-title h2 {
      margin: 0;
      font-size: clamp(28px, 4vw, 48px);
      font-weight: 900;
      color: #102414;
      letter-spacing: -1px;
    }

    .speedway-teamwork-title span {
      color: #3d8b32;
    }

    /* SCENE */

    .speedway-work-scene {
      width: 100%;
      height: 430px;
      position: relative;
      overflow: hidden;
    }

    /* BACKGROUND DECOR */

    .speedway-work-light {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: rgba(255,255,255,0.28);
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
    }

    .speedway-work-spark {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #72a94d;
      animation: speedwayWorkSpark 2s ease-in-out infinite;
    }

    .speedway-work-spark.one {
      left: 17%;
      top: 110px;
    }

    .speedway-work-spark.two {
      left: 78%;
      top: 90px;
      animation-delay: .6s;
    }

    .speedway-work-spark.three {
      left: 87%;
      top: 190px;
      animation-delay: 1.1s;
    }

    @keyframes speedwayWorkSpark {
      0%,100% {
        transform: scale(.5);
        opacity: .25;
      }
      50% {
        transform: scale(1.5);
        opacity: 1;
      }
    }

    /* FLOOR */

    .speedway-work-floor {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 90px;
      background: #9dcc82;
      border-top: 5px solid #659c4e;
    }

    .speedway-work-floor-line {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 42px;
      height: 4px;
      background: rgba(40,90,35,.22);
    }

    /* PACKING TABLE */

    .speedway-work-table {
      position: absolute;
      width: 240px;
      height: 18px;
      left: 50%;
      top: 210px;
      transform: translateX(-50%);
      background: #78451f;
      border-radius: 7px;
      box-shadow: 0 7px 0 #543016;
      z-index: 7;
    }

    .speedway-work-table-leg {
      position: absolute;
      width: 15px;
      height: 125px;
      top: 18px;
      background: #61381b;
      border-radius: 5px;
    }

    .speedway-work-table-leg.left {
      left: 28px;
    }

    .speedway-work-table-leg.right {
      right: 28px;
    }

    /* OPEN BOX */

    .speedway-work-box {
      position: absolute;
      width: 105px;
      height: 78px;
      left: 50%;
      top: 130px;
      transform: translateX(-50%);
      z-index: 10;
    }

    .speedway-work-box-body {
      position: absolute;
      width: 105px;
      height: 70px;
      bottom: 0;
      background: #d7943e;
      border: 4px solid #a86620;
      box-sizing: border-box;
      border-radius: 3px;
      box-shadow: inset 0 0 0 3px rgba(255,255,255,.12);
    }

    .speedway-work-box-flap {
      position: absolute;
      width: 50px;
      height: 25px;
      top: 5px;
      background: #e5a64e;
      border: 3px solid #a86620;
      box-sizing: border-box;
      transform-origin: bottom;
    }

    .speedway-work-box-flap.left {
      left: 0;
      transform: rotate(-28deg);
      animation: speedwayFlapLeft 1.7s ease-in-out infinite;
    }

    .speedway-work-box-flap.right {
      right: 0;
      transform: rotate(28deg);
      animation: speedwayFlapRight 1.7s ease-in-out infinite;
    }

    @keyframes speedwayFlapLeft {
      0%,100% { transform: rotate(-28deg); }
      50% { transform: rotate(-48deg); }
    }

    @keyframes speedwayFlapRight {
      0%,100% { transform: rotate(28deg); }
      50% { transform: rotate(48deg); }
    }

    /* ITEM GOING INTO BOX */

    .speedway-work-item {
      position: absolute;
      width: 25px;
      height: 25px;
      border-radius: 5px;
      background: #f1c15a;
      border: 3px solid #a76d1e;
      left: 39%;
      top: 115px;
      z-index: 16;
      animation: speedwayItemIntoBox 2.8s ease-in-out infinite;
    }

    @keyframes speedwayItemIntoBox {
      0% {
        transform: translate(0, -20px) rotate(0deg);
        opacity: 0;
      }
      15% {
        opacity: 1;
      }
      55% {
        transform: translate(95px, 35px) rotate(160deg);
        opacity: 1;
      }
      70% {
        transform: translate(105px, 70px) rotate(240deg);
        opacity: 0;
      }
      100% {
        transform: translate(105px, 70px);
        opacity: 0;
      }
    }

    /* PERSON 1 - PACKER */

    .speedway-worker-one {
      position: absolute;
      left: calc(50% - 270px);
      top: 95px;
      width: 105px;
      height: 235px;
      z-index: 14;
      animation: speedwayWorkerOne 2.8s ease-in-out infinite;
    }

    @keyframes speedwayWorkerOne {
      0%,100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(10px);
      }
    }

    .speedway-worker-head {
      position: absolute;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: #b96f45;
      left: 30px;
      top: 0;
      border: 3px solid #713b29;
    }

    .speedway-worker-hair {
      position: absolute;
      width: 46px;
      height: 20px;
      border-radius: 25px 25px 8px 8px;
      background: #2c211d;
      left: 29px;
      top: -2px;
      z-index: 2;
    }

    .speedway-worker-body {
      position: absolute;
      width: 58px;
      height: 85px;
      left: 24px;
      top: 49px;
      background: #3d8b32;
      border-radius: 18px 18px 10px 10px;
      border: 3px solid #276324;
    }

    .speedway-worker-body::after {
      content: "PACK";
      position: absolute;
      left: 8px;
      top: 30px;
      color: white;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 1px;
    }

    /* PACKING ARMS */

    .speedway-worker-arm {
      position: absolute;
      width: 57px;
      height: 14px;
      background: #b96f45;
      border-radius: 10px;
      top: 66px;
      transform-origin: 8px 7px;
      z-index: 5;
    }

    .speedway-worker-arm.left {
      left: 8px;
      transform: rotate(55deg);
      animation: speedwayPackArmLeft 2.8s ease-in-out infinite;
    }

    .speedway-worker-arm.right {
      left: 57px;
      transform-origin: 5px 7px;
      transform: rotate(125deg);
      animation: speedwayPackArmRight 2.8s ease-in-out infinite;
    }

    @keyframes speedwayPackArmLeft {
      0%,100% {
        transform: rotate(45deg);
      }
      50% {
        transform: rotate(82deg);
      }
    }

    @keyframes speedwayPackArmRight {
      0%,100% {
        transform: rotate(130deg);
      }
      50% {
        transform: rotate(92deg);
      }
    }

    .speedway-worker-leg {
      position: absolute;
      width: 17px;
      height: 85px;
      background: #283b58;
      top: 130px;
      border-radius: 10px;
    }

    .speedway-worker-leg.left {
      left: 30px;
      transform: rotate(5deg);
    }

    .speedway-worker-leg.right {
      left: 59px;
      transform: rotate(-5deg);
    }

    .speedway-worker-shoe {
      position: absolute;
      width: 33px;
      height: 14px;
      background: #202020;
      border-radius: 12px;
      top: 208px;
    }

    .speedway-worker-shoe.left {
      left: 17px;
    }

    .speedway-worker-shoe.right {
      left: 55px;
    }

    /* PERSON 2 - LIFTING */

    .speedway-worker-two {
      position: absolute;
      left: calc(50% + 155px);
      top: 105px;
      width: 115px;
      height: 240px;
      z-index: 15;
      animation: speedwayWorkerLift 3.2s ease-in-out infinite;
    }

    @keyframes speedwayWorkerLift {
      0%,100% {
        transform: translateY(18px);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    .speedway-lift-box {
      position: absolute;
      width: 55px;
      height: 48px;
      left: 27px;
      top: 125px;
      background: #d7943e;
      border: 4px solid #9b5d1c;
      border-radius: 3px;
      z-index: 4;
      animation: speedwayLiftBox 3.2s ease-in-out infinite;
    }

    @keyframes speedwayLiftBox {
      0%,20% {
        transform: translateY(42px);
      }
      50%,70% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(42px);
      }
    }

    .speedway-worker-two .speedway-worker-body {
      background: #3f719d;
      border-color: #28506f;
    }

    .speedway-lift-arm {
      position: absolute;
      width: 65px;
      height: 14px;
      background: #b96f45;
      border-radius: 10px;
      top: 112px;
      z-index: 8;
      transform-origin: 7px 7px;
    }

    .speedway-lift-arm.left {
      left: 8px;
      transform: rotate(35deg);
      animation: speedwayLiftArmLeft 3.2s ease-in-out infinite;
    }

    .speedway-lift-arm.right {
      left: 58px;
      transform-origin: 5px 7px;
      transform: rotate(145deg);
      animation: speedwayLiftArmRight 3.2s ease-in-out infinite;
    }

    @keyframes speedwayLiftArmLeft {
      0%,20% {
        transform: rotate(70deg);
      }
      50%,70% {
        transform: rotate(32deg);
      }
      100% {
        transform: rotate(70deg);
      }
    }

    @keyframes speedwayLiftArmRight {
      0%,20% {
        transform: rotate(110deg);
      }
      50%,70% {
        transform: rotate(148deg);
      }
      100% {
        transform: rotate(110deg);
      }
    }

    /* PERSON 3 - TROLLEY */

    .speedway-worker-three {
      position: absolute;
      left: 7%;
      top: 135px;
      width: 110px;
      height: 225px;
      z-index: 12;
      animation: speedwayPushWorker 7s linear infinite;
    }

    @keyframes speedwayPushWorker {
      0% {
        transform: translateX(-30px);
      }
      45% {
        transform: translateX(90px);
      }
      55% {
        transform: translateX(90px);
      }
      100% {
        transform: translateX(-30px);
      }
    }

    .speedway-worker-three .speedway-worker-body {
      background: #d17c28;
      border-color: #9d5a18;
    }

    .speedway-push-arm {
      position: absolute;
      width: 68px;
      height: 13px;
      background: #b96f45;
      border-radius: 10px;
      left: 58px;
      top: 70px;
      transform: rotate(20deg);
      transform-origin: left center;
      animation: speedwayPushArm 1s ease-in-out infinite alternate;
    }

    @keyframes speedwayPushArm {
      from {
        transform: rotate(12deg);
      }
      to {
        transform: rotate(25deg);
      }
    }

    /* TROLLEY */

    .speedway-work-trolley {
      position: absolute;
      left: 15%;
      top: 225px;
      width: 145px;
      height: 90px;
      z-index: 10;
      animation: speedwayTrolleyMove 7s linear infinite;
    }

    @keyframes speedwayTrolleyMove {
      0% {
        transform: translateX(-20px);
      }
      45% {
        transform: translateX(90px);
      }
      55% {
        transform: translateX(90px);
      }
      100% {
        transform: translateX(-20px);
      }
    }

    .speedway-trolley-platform {
      position: absolute;
      left: 0;
      top: 35px;
      width: 100px;
      height: 15px;
      background: #343434;
      border-radius: 5px;
    }

    .speedway-trolley-handle {
      position: absolute;
      left: 88px;
      top: 3px;
      width: 55px;
      height: 45px;
      border-left: 8px solid #343434;
      border-top: 8px solid #343434;
      border-radius: 8px;
      transform: rotate(5deg);
    }

    .speedway-trolley-wheel {
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #202020;
      bottom: 15px;
      border: 4px solid #555;
      animation: speedwayWheelSpin .6s linear infinite;
    }

    .speedway-trolley-wheel.left {
      left: 12px;
    }

    .speedway-trolley-wheel.right {
      left: 75px;
    }

    @keyframes speedwayWheelSpin {
      to {
        transform: rotate(360deg);
      }
    }

    /* BOXES ON TROLLEY */

    .speedway-trolley-box {
      position: absolute;
      width: 48px;
      height: 42px;
      background: #d7943e;
      border: 3px solid #9b5d1c;
      bottom: 50px;
    }

    .speedway-trolley-box.one {
      left: 8px;
    }

    .speedway-trolley-box.two {
      left: 45px;
      bottom: 50px;
    }

    .speedway-trolley-box.three {
      left: 27px;
      bottom: 89px;
      width: 43px;
      height: 38px;
    }

    /* SMALL FLOATING BOXES */

    .speedway-floating-box {
      position: absolute;
      width: 35px;
      height: 32px;
      background: #e3a049;
      border: 3px solid #a86620;
      animation: speedwayFloatingBox 3s ease-in-out infinite;
    }

    .speedway-floating-box.one {
      right: 17%;
      top: 85px;
    }

    .speedway-floating-box.two {
      right: 11%;
      top: 135px;
      animation-delay: 1s;
    }

    @keyframes speedwayFloatingBox {
      0%,100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-18px) rotate(5deg);
      }
    }

    /* MOTION LINES */

    .speedway-motion-lines {
      position: absolute;
      width: 70px;
      height: 40px;
      left: 4%;
      top: 270px;
      opacity: .6;
      animation: speedwayMotionLines 1s ease-in-out infinite;
    }

    .speedway-motion-lines::before,
    .speedway-motion-lines::after {
      content: "";
      position: absolute;
      right: 0;
      width: 55px;
      height: 5px;
      background: #4e873d;
      border-radius: 5px;
    }

    .speedway-motion-lines::before {
      top: 5px;
    }

    .speedway-motion-lines::after {
      top: 22px;
      width: 35px;
    }

    @keyframes speedwayMotionLines {
      0%,100% {
        opacity: .2;
        transform: translateX(0);
      }
      50% {
        opacity: .8;
        transform: translateX(-12px);
      }
    }

    /* MOBILE */

    @media (max-width: 800px) {

      .speedway-teamwork-section {
        min-height: 600px;
        padding-top: 22px;
      }

      .speedway-work-scene {
        height: 500px;
        transform: scale(.9);
        transform-origin: top center;
      }

      .speedway-work-table {
        top: 235px;
      }

      .speedway-work-box {
        top: 155px;
      }

      .speedway-worker-one {
        left: 8%;
        top: 125px;
        transform: scale(.85);
      }

      .speedway-worker-two {
        left: auto;
        right: 5%;
        top: 135px;
        transform: scale(.82);
      }

      .speedway-worker-three {
        left: -4%;
        top: 175px;
        transform: scale(.75);
      }

      .speedway-work-trolley {
        left: 3%;
        top: 280px;
      }

      .speedway-work-item {
        display: none;
      }

      .speedway-floating-box.one {
        right: 8%;
      }

      .speedway-floating-box.two {
        right: 4%;
      }
    }

    @media (max-width: 520px) {

      .speedway-teamwork-section {
        min-height: 560px;
        padding-top: 18px;
      }

      .speedway-teamwork-title h2 {
        font-size: 30px;
      }

      .speedway-work-scene {
        height: 470px;
        transform: scale(.78);
        width: 128%;
        margin-left: -14%;
      }

      .speedway-worker-one {
        left: 4%;
      }

      .speedway-worker-two {
        right: 1%;
      }

      .speedway-work-light {
        width: 240px;
        height: 240px;
      }
    }

  `}</style>

  {/* HEADING ONLY */}
  <div className="speedway-teamwork-title">
    <h2>
      How Our <span>Team Works</span>
    </h2>
  </div>

  {/* ANIMATED WORKING AREA */}
  <div className="speedway-work-scene">

    <div className="speedway-work-light"></div>

    <div className="speedway-work-spark one"></div>
    <div className="speedway-work-spark two"></div>
    <div className="speedway-work-spark three"></div>

    {/* FLOATING BOXES */}
    <div className="speedway-floating-box one"></div>
    <div className="speedway-floating-box two"></div>

    {/* PACKING TABLE */}
    <div className="speedway-work-table">
      <div className="speedway-work-table-leg left"></div>
      <div className="speedway-work-table-leg right"></div>
    </div>

    {/* OPEN BOX */}
    <div className="speedway-work-box">

      <div className="speedway-work-box-flap left"></div>
      <div className="speedway-work-box-flap right"></div>

      <div className="speedway-work-box-body"></div>

    </div>

    {/* ITEM BEING PACKED */}
    <div className="speedway-work-item"></div>

    {/* WORKER 1 */}
    <div className="speedway-worker-one">

      <div className="speedway-worker-head"></div>
      <div className="speedway-worker-hair"></div>

      <div className="speedway-worker-body"></div>

      <div className="speedway-worker-arm left"></div>
      <div className="speedway-worker-arm right"></div>

      <div className="speedway-worker-leg left"></div>
      <div className="speedway-worker-leg right"></div>

      <div className="speedway-worker-shoe left"></div>
      <div className="speedway-worker-shoe right"></div>

    </div>

    {/* WORKER 2 */}
    <div className="speedway-worker-two">

      <div className="speedway-worker-head"></div>
      <div className="speedway-worker-hair"></div>

      <div className="speedway-worker-body"></div>

      <div className="speedway-lift-arm left"></div>
      <div className="speedway-lift-arm right"></div>

      <div className="speedway-lift-box"></div>

      <div className="speedway-worker-leg left"></div>
      <div className="speedway-worker-leg right"></div>

      <div className="speedway-worker-shoe left"></div>
      <div className="speedway-worker-shoe right"></div>

    </div>

    {/* WORKER 3 */}
    <div className="speedway-worker-three">

      <div className="speedway-worker-head"></div>
      <div className="speedway-worker-hair"></div>

      <div className="speedway-worker-body"></div>

      <div className="speedway-push-arm"></div>

      <div className="speedway-worker-leg left"></div>
      <div className="speedway-worker-leg right"></div>

      <div className="speedway-worker-shoe left"></div>
      <div className="speedway-worker-shoe right"></div>

    </div>

    {/* TROLLEY */}
    <div className="speedway-work-trolley">

      <div className="speedway-trolley-platform"></div>

      <div className="speedway-trolley-handle"></div>

      <div className="speedway-trolley-box one"></div>
      <div className="speedway-trolley-box two"></div>
      <div className="speedway-trolley-box three"></div>

      <div className="speedway-trolley-wheel left"></div>
      <div className="speedway-trolley-wheel right"></div>

    </div>

    <div className="speedway-motion-lines"></div>

    {/* FLOOR */}
    <div className="speedway-work-floor"></div>
    <div className="speedway-work-floor-line"></div>

  </div>

</section>
{/* =====================================================
    SERVICES SECTION
===================================================== */}

<section
  id="services"
  className="section alt services-section"
>

  <style>{`

    /* =================================================
       SERVICES IMAGE CARDS
    ================================================= */

    .speedway-service-image {
      width: 100%;
      height: 190px;
      overflow: hidden;
      border-radius: 16px;
      margin-bottom: 20px;
      position: relative;
      background: #dfeadd;
    }

    .speedway-service-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition:
        transform .7s ease,
        filter .7s ease;
    }

    .service-card:hover
    .speedway-service-image img {
      transform: scale(1.08);
      filter: brightness(1.06);
    }

    .speedway-service-image::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0,0,0,0) 45%,
        rgba(20,45,25,.25) 100%
      );
      pointer-events: none;
    }


    /* =================================================
       SERVICE CARDS
    ================================================= */

    .services-section .service-card {
      position: relative;
      overflow: hidden;
      transition:
        transform .4s ease,
        box-shadow .4s ease;
    }

    .services-section .service-card:hover {
      transform: translateY(-7px);
      box-shadow:
        0 18px 38px rgba(38,70,40,.15);
    }


    /* =================================================
       SERVICE TITLES
    ================================================= */

    .services-section .service-card h3 {
      color: #26352A !important;
      font-weight: 900 !important;
      opacity: 1 !important;
      visibility: visible !important;
    }


    /* =================================================
       SERVICE DESCRIPTION
    ================================================= */

    .services-section .service-card p {
      color: #526052 !important;
      opacity: 1 !important;
      visibility: visible !important;
    }


    /* =================================================
       LEARN MORE
    ================================================= */

    .services-section .service-link {
      color: #3d8b32 !important;
      font-weight: 900 !important;
      cursor: pointer;
      display: inline-block;
      transition:
        color .3s ease,
        transform .3s ease;
    }

    .services-section .service-link:hover {
      color: #245b20 !important;
      transform: translateX(5px);
    }


    /* =================================================
       SERVICES HEADING
    ================================================= */

    .services-section .eyebrow {
      color: #3d8b32 !important;
      font-weight: 900 !important;
    }

    .services-section .section-heading h2 {
      color: #26352A !important;
      font-weight: 900 !important;
    }

    .services-section .section-heading p {
      color: #526052 !important;
      opacity: 1 !important;
    }


    /* =================================================
       ADVANTAGE IMAGE
    ================================================= */

    .speedway-advantage-image {
      width: 100%;
      height: 145px;
      overflow: hidden;
      border-radius: 15px;
      margin-bottom: 18px;
      position: relative;
    }

    .speedway-advantage-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition:
        transform .7s ease,
        filter .7s ease;
    }

    .advantage-card:hover
    .speedway-advantage-image img {
      transform: scale(1.08);
      filter: brightness(1.06);
    }


    /* =================================================
       ADVANTAGE TITLES
    ================================================= */

    .advantage-card h3,
    .advantage-card h3.blink-text {
      color: #bce98f !important;
      font-weight: 900 !important;
      opacity: 1 !important;
      visibility: visible !important;
      text-shadow: 0 1px 8px rgba(0,0,0,.2);
    }

    .advantage-card p {
      color: #ffffff !important;
      opacity: 1 !important;
      visibility: visible !important;
    }


    /* =================================================
       PROCESS IMAGE
    ================================================= */

    .speedway-process-image {
      width: 100%;
      height: 150px;
      overflow: hidden;
      border-radius: 15px;
      margin-bottom: 18px;
      position: relative;
    }

    .speedway-process-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition:
        transform .7s ease,
        filter .7s ease;
    }

    .process-card:hover
    .speedway-process-image img {
      transform: scale(1.08);
      filter: brightness(1.06);
    }


    /* =================================================
       PROCESS IMAGE NUMBER
    ================================================= */

    .speedway-process-image-number {
      position: absolute;
      left: 14px;
      bottom: 12px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #3d8b32;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 16px;
      z-index: 3;
      box-shadow:
        0 5px 15px rgba(0,0,0,.2);
    }


    /* =================================================
       PROCESS TITLES
       ALL 4 GREEN
    ================================================= */

    .process-card h3 {
      color: #3d8b32 !important;
      font-weight: 900 !important;
      opacity: 1 !important;
      visibility: visible !important;
      text-shadow:
        0 1px 3px rgba(61,139,50,.12);
    }

    .process-card h3.blink-text {
      color: #3d8b32 !important;
    }


    /* =================================================
       PROCESS DESCRIPTIONS
    ================================================= */

    .process-card p {
      color: #526052 !important;
      opacity: 1 !important;
      visibility: visible !important;
    }


    /* =================================================
       PROCESS NUMBER
    ================================================= */

    .process-card .process-number {
      color: #3d8b32 !important;
      font-weight: 900 !important;
    }


    /* =================================================
       MOBILE
    ================================================= */

    @media (max-width: 700px) {

      .speedway-service-image {
        height: 170px;
      }

      .speedway-advantage-image {
        height: 160px;
      }

      .speedway-process-image {
        height: 165px;
      }

      .services-section .service-card:hover {
        transform: none;
      }

    }

  `}</style>

{/* =====================================================
    SERVICES
===================================================== */}

<div className="container">

  <div className="section-heading reveal">

    <div className="eyebrow">
      OUR SERVICES
    </div>

    <h2
      className="blink-text"
      style={{
        color: "#26352A",
      }}
    >
      Moving solutions for
      different requirements.
    </h2>

    <p
      style={{
        color: "#526052",
      }}
    >
      From household belongings
      to office equipment, our
      services are designed around
      the practical stages of
      relocation.
    </p>

  </div>


  {/* =================================================
      SERVICE CARDS
  ================================================= */}

  <div className="service-grid">

    {services.map(
      (service, index) => (

        <div
          className="service-card reveal"
          key={service.title}
          style={{
            transitionDelay:
              `${index * 70}ms`,
          }}
        >

          {/* SERVICE IMAGE */}

          <div className="speedway-service-image">

            <img
              src={
                index === 0
                  ? "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85"

                  /* OFFICE RELOCATION */
                  : index === 1
                  ? "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85"

                  /* PACKING & UNPACKING - PACKED BOXES */
                  : index === 2
                  ? "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=85"

                  /* LOCAL SHIFTING */
                  : index === 3
                  ? "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=900&q=85"

                  /* INTERCITY RELOCATION */
                  : index === 4
                  ? "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=900&q=85"

                  /* VEHICLE TRANSPORTATION */
                  : "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85"
              }
              alt={service.title}
              loading="lazy"
            />

          </div>


          {/* SERVICE ICON */}

          <div className="service-icon">
            {service.icon}
          </div>


          {/* SERVICE TITLE */}

          <h3
            className="blink-text"
            style={{
              color: "#26352A",
            }}
          >
            {service.title}
          </h3>


          {/* SERVICE DESCRIPTION */}

          <p
            style={{
              color: "#526052",
            }}
          >
            {service.text}
          </p>


          {/* LEARN MORE */}

          <span
            className="service-link"
            onClick={() =>
              setSelectedService(service)
            }
          >
            Learn More →
          </span>

        </div>

      )
    )}

  </div>

</div>



{/* =====================================================
    ADVANTAGES
===================================================== */}

<section className="section dark">

  <div className="container">

    <div className="section-heading reveal">

      <div className="eyebrow">
        WHY CHOOSE US
      </div>

      <h2 className="blink-text">
        Practical support at
        every stage.
      </h2>

      <p>
        A relocation becomes easier
        when packing, loading,
        transportation and delivery
        are planned properly.
      </p>

    </div>


    <div className="advantage-grid">

      {advantages.map(
        (item, index) => (

          <div
            className="advantage-card reveal"
            key={item.title}
            style={{
              transitionDelay:
                `${index * 80}ms`,
            }}
          >

            {/* ADVANTAGE IMAGE */}

            <div className="speedway-advantage-image">

              <img
                src={[
                  /* =================================================
                     1. CAREFUL PACKING
                  ================================================= */
                  "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=900&q=85",

                  /* =================================================
                     2. RELIABLE TRANSPORTATION
                  ================================================= */
                  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85",

                  /* =================================================
                     3. MOVING ASSISTANCE
                     Movers carrying furniture / household items
                  ================================================= */
                  "https://kvlg.ru/sites/default/files/img/uslugi/service/perevozka-s-gruzchikami.webp",

                  /* =================================================
                     4. DOOR-TO-DOOR SUPPORT
                     Delivery at customer's doorstep
                  ================================================= */
                  "https://lirp.cdn-website.com/32692288/dms3rep/multi/opt/Security%2BMoving%2B2-1920w.jpg",

                ][index % 4]}
                alt={item.title}
                loading="lazy"
              />

            </div>


            <div className="advantage-icon">
              {item.icon}
            </div>


            <h3 className="blink-text">
              {item.title}
            </h3>


            <p>
              {item.text}
            </p>

          </div>
        )
      )}

    </div>

  </div>

</section>



{/* =====================================================
    PROCESS
===================================================== */}

<section
  id="process"
  className="section"
>

  <div className="container">

    <div className="section-heading reveal">

      <div className="eyebrow">
        OUR PROCESS
      </div>

      <h2 className="blink-text">
        Simple steps from pickup
        to delivery.
      </h2>

      <p>
        We keep the moving process
        easy to understand so you know
        what happens at each stage.
      </p>

    </div>


    <div className="process-grid">

      {process.map(
        (item, index) => (

          <div
            className="process-card reveal"
            key={item.number}
            style={{
              transitionDelay:
                `${index * 70}ms`,
            }}
          >

            {/* PROCESS IMAGE */}

            <div className="speedway-process-image">

              <img
                src={[
                  /* =================================================
                     1. CAREFUL PACKING
                     PERSON CAREFULLY WRAPPING FRAGILE ITEM
                  ================================================= */
                  "https://galaxyremovals.co.uk/_next/static/media/fragile.9161432e.jpeg",

                  /* =================================================
                     2. RELIABLE TRANSPORTATION
                     MOVING TRUCK ON HIGHWAY
                  ================================================= */
                  "https://nextphasemoving.com/assets/images/photos/truck-photo-desktop.jpg",

                  /* =================================================
                     3. MOVING ASSISTANCE
                     MOVERS CARRYING FURNITURE
                  ================================================= */
                  "https://kvlg.ru/sites/default/files/img/uslugi/service/perevozka-s-gruzchikami.webp",

                  /* =================================================
                     4. DOOR TO DOOR DELIVERY
                     DELIVERY WORKER HANDING PACKAGE
                  ================================================= */
                  "https://imgcp.aacdn.jp/img-a/800/600/aa/gm/article/5/0/5/1/5/6/202408081959/800__image_03.jpg",

                ][index % 4]}
                alt={item.title}
                loading="lazy"
              />


              <div className="speedway-process-image-number">
                {item.number}
              </div>

            </div>


            {/* PROCESS NUMBER */}

            <div className="process-number blink-text">
              {item.number}
            </div>


            {/* PROCESS TITLE */}

            <h3>
              {item.title}
            </h3>


            {/* PROCESS DESCRIPTION */}

            <p>
              {item.text}
            </p>

          </div>
        )
      )}

    </div>

  </div>

</section>

</section>
        {/* MOVING JOURNAL */}

        <section
          id="journal"
          className="section journal-section"
        >

          <div className="container">

            <div className="section-heading reveal">

              <div className="eyebrow">
                THE MOVING JOURNAL
              </div>

              <h2 className="blink-text">
                Guides worth packing.
              </h2>

              <p>
                Helpful moving guides,
                checklists and packing tips
                to make your next relocation
                more organised.
              </p>

            </div>

            <div className="journal-grid">

              {guides.map(
                (guide, index) => (

                  <article
                    className="journal-card reveal"
                    key={guide.title}
                    style={{
                      transitionDelay:
                        `${index * 100}ms`,
                    }}
                  >

                    <div className="journal-icon">
                      {guide.icon}
                    </div>

                    <div className="journal-meta">
                      {guide.category}
                      {" "}•{" "}
                      {guide.time}
                    </div>

                    <h3 className="blink-text">
                      {guide.title}
                    </h3>

                    <p>
                      {guide.text}
                    </p>

                    <button
                      className="journal-read"
                      onClick={() =>
                        setSelectedGuide(
                          guide
                        )
                      }
                    >
                      Read Guide →
                    </button>

                  </article>

                )
              )}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="cta">

          <div className="container cta-inner">

            <div className="reveal">

              <h2 className="blink-text">
                Planning your next move?
              </h2>

              <p>
                Share your shifting
                requirement with Speedway
                Worldwide Express and
                let us discuss the right
                moving support for you.
              </p>

            </div>

            <div className="cta-actions reveal">

              <button
                className="btn btn-primary"
                onClick={() =>
                  setShowQuote(true)
                }
              >
                Get Free Quote
              </button>

              <button
                className="btn btn-light"
                onClick={openWhatsApp}
              >
                WhatsApp
              </button>

            </div>

          </div>

        </section>

        {/* FAQ */}

        <section className="section faq-section">

          <div className="container">

            <div className="section-heading reveal">

              <div className="eyebrow">
                FAQ
              </div>

              <h2 className="blink-text">
                Frequently asked
                questions.
              </h2>

              <p>
                A few common questions
                about packing and moving
                services.
              </p>

            </div>

            <div className="faq-grid">

              {faqs.map(
                (faq, index) => (

                  <div
                    className="faq-item reveal"
                    key={faq.q}
                    style={{
                      transitionDelay:
                        `${index * 60}ms`,
                    }}
                  >

                    <h3 className="blink-text">
                      {faq.q}
                    </h3>

                    <p>
                      {faq.a}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* CONTACT */}

        <section
          id="contact"
          className="section alt"
        >

          <div className="container">

            <div className="contact-grid">

              <div className="contact-card reveal">

                <div className="eyebrow">
                  CONTACT US
                </div>

                <h2 className="blink-text">
                  Let's plan your move.
                </h2>

                <p>
                  Contact SPEEDWAY
                  And Movers for your
                  packing, moving and
                  relocation requirement.
                </p>

                <div className="contact-item">

                  <div className="contact-item-icon">
                    📍
                  </div>

                  <div>

                    <strong>
                      Address
                    </strong>

                    <span>
                      {company.address}
                    </span>

                  </div>

                </div>

                <div className="contact-item">

                  <div className="contact-item-icon">
                    📞
                  </div>

                  <div>

                    <strong>
                      Phone
                    </strong>

                    <span>
                      {company.phone}
                    </span>

                  </div>

                </div>

                <div className="contact-item">

                  <div className="contact-item-icon">
                    ✉️
                  </div>

                  <div>

                    <strong>
                      Email
                    </strong>

                    <span>
                      {company.email}
                    </span>

                  </div>

                </div>

                <div className="contact-actions">

                  <button
                    className="btn btn-primary"
                    onClick={callNow}
                  >
                    📞 Call Now
                  </button>

                  <button
                    className="btn btn-light"
                    onClick={openWhatsApp}
                  >
                    💬 WhatsApp
                  </button>

                </div>

              </div>

              <div className="map-card reveal">

                <iframe
                  title="Speedway Worldwide Express Location"
                  src="https://www.google.com/maps?q=Speedway+Worldwide+Express,+9-1-218,+Street+No.+7,+Mukarampura,+Karimnagar,+Telangana&output=embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="footer">

          <div className="container">

            <div className="footer-grid">

              <div>

                <h3>
                  Speedway Worldwide Express
                </h3>

                <p>
                  Packing, moving and
                  relocation support for
                  households, offices and
                  personal belongings.
                  Based in Mukarampura,
                  Karimnagar.
                </p>

              </div>

              <div>

                <h3>
                  Quick Links
                </h3>

                <div className="footer-links">

                  <button
                    onClick={() =>
                      scrollToSection("home")
                    }
                  >
                    Home
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("about")
                    }
                  >
                    About
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("services")
                    }
                  >
                    Services
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("process")
                    }
                  >
                    Process
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("areas")
                    }
                  >
                    Areas
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("journal")
                    }
                  >
                    Journal
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("contact")
                    }
                  >
                    Contact
                  </button>

                </div>

              </div>

              <div>

                <h3>
                  Contact
                </h3>

                <div className="footer-links">

                  <button onClick={callNow}>
                    📞 {company.phone}
                  </button>

                  <button
                    onClick={openWhatsApp}
                  >
                    💬 WhatsApp
                  </button>

                  <span>
                    ✉️ {company.email}
                  </span>

                  <span>
                    📍 {company.address}
                  </span>

                </div>

              </div>

              <div>

                <h3>
                  Moving Support
                </h3>

                <p>
                  Residential shifting, office relocation, packing and unpacking, local moves, intercity relocation and vehicle transportation.
                </p>

                <p style={{ marginTop: "12px" }}>
                  Serving Karimnagar and nearby Telangana cities with organised moving support.
                </p>

              </div>

            </div>

            <div className="footer-bottom">

              <span>

                © {new Date().getFullYear()}
                {" "}
                Speedway Worldwide Express.
                All Rights Reserved.

              </span>

              <span>

                Designed & Developed by{" "}

                <a
                  className="astroidea"
                  href="https://www.astroideasoftway.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  AstroIdea Softway LLP
                </a>

              </span>

            </div>

          </div>

        </footer>

        {/* FLOATING BUTTONS */}

        <div className="floating-buttons">

          <button
            className="floating-button float-call"
            onClick={callNow}
            title="Call Speedway Worldwide Express"
          >
            📞
          </button>

          <button
            className="floating-button float-whatsapp"
            onClick={openWhatsApp}
            title="WhatsApp Speedway Worldwide Express"
          >
            💬
          </button>

        </div>

        {/* ADMIN LOGIN PORTAL */}

        {showAdminLogin && (

          <div
            className="admin-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeAdminPortal();
              }
            }}
          >

            <div
              className="admin-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="admin-close"
                type="button"
                onClick={closeAdminPortal}
                aria-label="Close admin login"
              >
                ✕
              </button>

              <div className="admin-brand">
                <div className="admin-brand-icon">K</div>

                <div>
                  <div className="admin-kicker">
                    Packer & Mover Admin Portal
                  </div>
                  <div className="admin-brand-title">
                    Speedway Worldwide Express
                  </div>
                </div>
              </div>

              <h2>Welcome Back!</h2>

              <p className="admin-subtitle">
                Please sign in to manage your logistics dashboard.
              </p>

              <form onSubmit={handleAdminLogin}>

                <div className="admin-field">
                  <label htmlFor="admin-email">
                    Email Address
                  </label>

                  <input
                    id="admin-email"
                    className="admin-input"
                    type="email"
                    placeholder="admin@packersmovers.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="admin-password">
                    Password
                  </label>

                  <div className="admin-input-wrap">
                    <input
                      id="admin-password"
                      className="admin-input has-eye"
                      type={showAdminPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      className="admin-eye"
                      type="button"
                      onClick={() =>
                        setShowAdminPassword((value) => !value)
                      }
                      aria-label={
                        showAdminPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showAdminPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="admin-field">
                  <label htmlFor="admin-role">
                    Select Role
                  </label>

                  <select
                    id="admin-role"
                    className="admin-select"
                    value={adminRole}
                    onChange={(e) => setAdminRole(e.target.value)}
                  >
                    <option>Branch Manager</option>
                    <option>Operations Manager</option>
                    <option>Administrator</option>
                  </select>
                </div>

                <div className="admin-options">
                  <label className="remember-device">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) =>
                        setRememberDevice(e.target.checked)
                      }
                    />
                    Remember this device
                  </label>

                  <button
                    className="forgot-password"
                    type="button"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  className="admin-login-submit"
                  type="submit"
                >
                  LOGIN
                </button>

                <div className="admin-security-note">
                  🔒 Secure admin access • Authorised personnel only
                </div>

              </form>

            </div>

          </div>

        )}

        {/* QUOTE MODAL */}

        {showQuote && (

          <div
            className="modal-backdrop"
            onClick={() =>
              setShowQuote(false)
            }
          >

            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <h2 className="blink-text">
                    Get Your Free Quote
                  </h2>

                  <p>
                    Tell us a few details
                    about your moving
                    requirement.
                  </p>

                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setShowQuote(false)
                  }
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={submitQuote}
              >

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Your Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={quoteForm.name}
                      onChange={(e) => updateQuoteField("name", e.target.value)}
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={quoteForm.phone}
                      onChange={(e) => updateQuoteField("phone", e.target.value)}
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      From Location
                    </label>

                    <input
                      type="text"
                      placeholder="Pickup city e.g. Karimnagar"
                      value={quoteForm.from}
                      onChange={(e) => updateQuoteField("from", e.target.value)}
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      To Location
                    </label>

                    <input
                      type="text"
                      placeholder="Destination city e.g. Hyderabad"
                      value={quoteForm.to}
                      onChange={(e) => updateQuoteField("to", e.target.value)}
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Moving Type
                    </label>

                    <select
                      required
                      value={quoteForm.service}
                      onChange={(e) => updateQuoteField("service", e.target.value)}
                    >

                      <option
                        value=""
                        disabled
                      >
                        Select service
                      </option>

                      <option>
                        House Shifting
                      </option>

                      <option>
                        Office Relocation
                      </option>

                      <option>
                        Local Shifting
                      </option>

                      <option>
                        Intercity Relocation
                      </option>

                      <option>
                        Vehicle Transportation
                      </option>

                      <option>
                        Packing & Unpacking
                      </option>

                    </select>

                  </div>

                  <div className="form-group">

                    <label>
                      Preferred Date
                    </label>

                    <input
                      type="date"
                      value={quoteForm.date}
                      onChange={(e) => updateQuoteField("date", e.target.value)}
                    />

                  </div>

                  <div className="form-group full">

                    <label>
                      Additional Details
                    </label>

                    <textarea
                      placeholder="Tell us about your items or moving requirement..."
                      value={quoteForm.details}
                      onChange={(e) => updateQuoteField("details", e.target.value)}
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                >
                  Submit Enquiry
                </button>

              </form>

            </div>

          </div>

        )}

        {showAddLocation && (
          <div
            className="sa-add-location-overlay"
            onClick={() => setShowAddLocation(false)}
          >
            <div
              className="sa-add-location-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sa-add-location-header">
                <div>
                  <h2>Add New Location</h2>
                  <p>
                    Add another city to your Service Areas list. It will be saved on this browser.
                  </p>
                </div>

                <button
                  type="button"
                  className="sa-add-location-close"
                  onClick={() => setShowAddLocation(false)}
                  aria-label="Close add location"
                >
                  ×
                </button>
              </div>

              <form
                className="sa-add-location-form"
                onSubmit={handleAddLocation}
              >
                <div className="sa-form-field">
                  <label htmlFor="new-location-city">City Name</label>
                  <input
                    id="new-location-city"
                    type="text"
                    value={newLocation.city}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        city: event.target.value,
                      }))
                    }
                    placeholder="Enter city name"
                    required
                  />
                </div>

                <div className="sa-form-field">
                  <label htmlFor="new-location-state">State</label>
                  <input
                    id="new-location-state"
                    type="text"
                    value={newLocation.state}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        state: event.target.value,
                      }))
                    }
                    placeholder="Enter state"
                  />
                </div>

                <div className="sa-form-field">
                  <label htmlFor="new-location-price">Starting Price</label>
                  <input
                    id="new-location-price"
                    type="text"
                    value={newLocation.startingPrice}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        startingPrice: event.target.value,
                      }))
                    }
                    placeholder="₹3,999"
                  />
                </div>

                <div className="sa-form-field">
                  <label htmlFor="new-location-time">Moving Time</label>
                  <input
                    id="new-location-time"
                    type="text"
                    value={newLocation.movingTime}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        movingTime: event.target.value,
                      }))
                    }
                    placeholder="Same-day local support"
                  />
                </div>

                <div className="sa-add-location-actions">
                  <button
                    type="button"
                    className="sa-add-cancel"
                    onClick={() => setShowAddLocation(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="sa-add-submit"
                  >
                    Add Location
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SERVICE MODAL */}

        {selectedService && (

          <div
            className="modal-backdrop"
            onClick={() =>
              setSelectedService(null)
            }
          >

            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <h2>
                    {selectedService.icon}{" "}
                    {selectedService.title}
                  </h2>

                  <p>
                    Speedway Worldwide Express
                  </p>

                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setSelectedService(null)
                  }
                >
                  ✕
                </button>

              </div>

              <p>
                {selectedService.text}
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedService(null);
                  setShowQuote(true);
                }}
              >
                Request A Quote
              </button>

            </div>

          </div>

        )}

        {/* JOURNAL MODAL */}

        {selectedGuide && (

          <div
            className="modal-backdrop"
            onClick={() =>
              setSelectedGuide(null)
            }
          >

            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <div className="journal-modal-meta">

                    {selectedGuide.icon}{" "}

                    {selectedGuide.category}

                    {" "}•{" "}

                    {selectedGuide.time}

                  </div>

                  <h2>
                    {selectedGuide.title}
                  </h2>

                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setSelectedGuide(null)
                  }
                >
                  ✕
                </button>

              </div>

              <p className="journal-modal-text">
                {selectedGuide.text}
              </p>

              <div className="journal-modal-note">

                📦 Helpful moving information
                from Speedway Worldwide Express.
                Plan your packing, pickup,
                transportation and delivery
                carefully for a smoother move.

              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedGuide(null);
                  setShowQuote(true);
                }}
              >
                Get Free Quote
              </button>

            </div>

          </div>

        )}

      </div>
    </>
  );
}