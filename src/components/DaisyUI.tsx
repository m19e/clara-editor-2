/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
export const DaisyUI = () => {
	return (
		<>
			<div className="fab">
				{/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
				<div
					tabIndex={0}
					role="button"
					className="btn btn-lg btn-circle btn-primary"
				>
					F
				</div>

				{/* buttons that show up when FAB is open */}
				<button type="button" className="btn btn-lg btn-circle">
					A
				</button>
				<button type="button" className="btn btn-lg btn-circle">
					B
				</button>
				<button type="button" className="btn btn-lg btn-circle">
					C
				</button>
			</div>
			<details className="dropdown">
				<summary className="btn m-1">open or close</summary>
				<ul className="menu dropdown-content z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm">
					<li>
						<a>Item 1</a>
					</li>
					<li>
						<a>Item 2</a>
					</li>
				</ul>
			</details>

			<div className="space-x-2">
				<input
					type="checkbox"
					value="synthwave"
					className="toggle theme-controller"
				/>
				<input
					type="checkbox"
					value="synthwave"
					className="checkbox theme-controller"
				/>
			</div>
			<input type="text" placeholder="Type here" className="input" />
		</>
	);
};
