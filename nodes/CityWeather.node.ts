import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class NasaPics implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'City Weather',
		name: 'CityWeather',
		icon: 'file:nasapics.svg', // sv temp
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from OpenWeatherMap API',
		defaults: {
			name: 'City Weather default',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'CityWeatherApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.openweathermap.org/data/2.5/weather',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

				// required field
		properties: [
				{
				displayName: 'City',
				name: 'cityName',
				type: 'string',
				default: '',
				placeholder: 'Honolulu',
				required: true,
				description: 'The name of the ciy to return the weather of',
				routing: {
					requests: {
						//method: "GET",
						// url: '=?q={{$value}}',
						qs: {
							q: '={{$value}}',
						},
					},
				},
			},
			// Operations will go here

			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: {},
				placeholder: 'Add Field',
				options: [
					{
						displayName: 'Format',
						name: 'format',
						type: 'options',
						noDataExpression: true,
						options: [
							{
								name: 'Imperial',
								value: 'imperial',
								description:'Fahrenheit / miles/hour',
							},

							{
								name: 'Metric',
								value: 'metric',
								description: 'Celsius / meter/sec',
							},

							{
								name: 'Scientific',
								value: 'standard',
								description: 'Kelvin / meter/sec',
							},
						],

						default: 'metric',
						description: 'The format in wich format the data [] returned',
						routing: {
							request: {
								qs: {
									units: '={{$value}}',
								},
							},
						},
					},
					{
					displayName: 'Language',
					name: 'language',
					type: 'string',
					default: '',
					placeholder: 'en',
					description: 'The two letter language code []',
					routing: {
						request: {
							qs: {
								lang: '={{$value}}',
							},
						},
					},
				},
			],
		},
	],
	};
}
