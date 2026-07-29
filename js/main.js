// Made with care and love, started on 7/29/26.

// Subscriber count
const apiKey    = "AIzaSyByVSvJv_4VrR_TzYER5AA7wsJoRUzceQg";
const channelId = "UCjW3mRWbXVxYVsCkqg9RAiQ";

async function loadSubscriberCount()
{
    const subscriberCountElement = document.getElementById("subscriber-count");

    if (!subscriberCountElement)
        return;

    try 
    {
        const url      = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`Youtube request failed: ${response.status}`);

        const data    = await response.json();
        const channel = data.items?.[0];

        if (!channel)
            throw new Error(`Channel was not found.`);

        const subscriberCount = channel.statistics.subscriberCount;

        subscriberCountElement.textContent = Number(subscriberCount).toLocaleString();
    }
    catch (error)
    {
        console.error(error);
        subscriberCountElement.textContent = "Unavailable";
    }
}

loadSubscriberCount();
