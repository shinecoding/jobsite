import {NextResponse} from 'next/server';

const allowedParams = [
    "keyword",
    "location",
    "page",
    "education",
    "experience",
    "salary",
    "jobType",
];

const country = req.geo.country

export async function middleware(req) {

    const country = req.geo.country
    const url = req.nextUrl;
    let changed = false;
    // console.log(url);


    url.searchParams.forEach((params, key) => {
        if(!allowedParams.includes(key)){
            url.searchParams.delete(key);
            changed = true
        }
    })

    if(changed) {
        return NextResponse.redirect(url)
    }
}