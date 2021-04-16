# Facemask Detection Api

## Overview
Detect wether a person is wearing a mask or not. So you can use this is your business entrance to detect if an employee can enter.

## Requirements
* NodeJS v12.19.0

## Guidelines
Follow these steps to run the Application.

1. Clone this repository

2. Install packages.
```bash
	# Windows & Linux
	npm install

```

3. Run App.
```bash
	# Windows & Linux
	npm start

```

4. Make resquests to the images endpoint.


## Endpoints
### Detect Image
Detect if person in an image is wearing a mask.

**URL** : `/images/detect`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a image sended we get the response.

```json
{
    "is_the_employee_wearing_mask": true
}
```

## Notes

* If the Image does not contain a `Person` we will get an error.

If there is a problem running the program be sure you have met all the requeriments if any other problem please make a issue.

## Disclaimers
* This is a starter example and intended to demonstrate to app providers a sample of how to approach an implementation. There are potentially other ways to approach it and alternatives could be considered. 
* Its possible that the repo is not actively maintained.

## License
MIT

The code in this repository is covered by the included license.

## Support
Please enter an issue in the repo for any questions or problems. 