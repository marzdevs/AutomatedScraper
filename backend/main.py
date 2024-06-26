from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_amazon_data(search_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    products = []

    # Example: Find all products in the search results
    results = soup.find_all('div', class_='s-result-item')

    for result in results:
        # Extract title
        title_element = result.find('h2')
        title = title_element.get_text().strip() if title_element else "Title not found"

        # Extract price
        price_element = result.find('span', class_='a-price')
        price = price_element.get_text().strip() if price_element else "Price not found"

        # Extract image URL
        image_element = result.find('img', class_='s-image')
        image_url = image_element['src'] if image_element else None

        products.append({
            'title': title,
            'price': price,
            'image_url': image_url
        })

    return products


@app.route('/api/products/graphic_cards', methods=['GET'])
def get_graphic_card_products():
    search_url = "https://www.amazon.com/s?k=graphics+card&crid=27QMND5VY6ENM&sprefix=graphics+card%2Caps%2C95&ref=nb_sb_noss_1"
    products = get_amazon_data(search_url)
    return jsonify(products)


@app.route('/api/products/motherboards', methods=['GET'])
def get_motherboard_products():
    search_url = "https://www.amazon.com/s?k=motherboard&crid=KOY8WJVGVWEL&sprefix=motherboard%2Caps%2C146&ref=nb_sb_noss_1"
    products = get_amazon_data(search_url)
    return jsonify(products)


@app.route('/api/products/ram', methods=['GET'])
def get_ram_products():
    search_url = "https://www.amazon.com/s?k=ram&crid=65LK499WLBNI&sprefix=ram%2Caps%2C107&ref=nb_sb_noss_1"
    products = get_amazon_data(search_url)
    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)
