const API_URL = "http://localhost/8080"


export default async function sendLocationToBackend(lat: number, lng: number) {
    const res = await fetch(`${API_URL}/api/restaurants/nearby` , {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            lat: 12,
            lng: 12,
            radiusKm: 5,
        }),
    });


    if (!res.ok){
        const text = await res.text();
        throw new Error (`Backend error ${res.status}: ${text}`);
    }


    const data = await res.text();
    console.log('Backend response: ' , data);
}

