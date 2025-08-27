export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-80 bg-sidebar border-r border-sidebar-border p-6 space-y-8">
          {/* Clock Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">CLOCK</h2>
            <div className="space-y-1">
              <div className="text-2xl font-mono font-bold text-foreground">27 August</div>
              <div className="text-lg text-muted-foreground">2025</div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-mono font-bold text-foreground">08:59</div>
                <div className="text-sm text-muted-foreground">Wednesday</div>
              </div>
            </div>
          </div>

          {/* Battery Status */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">BATTERY</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-foreground">Charging</span>
                <span className="text-lg font-mono text-primary">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <div className="text-sm text-muted-foreground">Feels like 2h 15m remaining</div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">TEMP</div>
                  <div className="text-sm font-mono text-foreground">42°C</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">POWER</div>
                  <div className="text-sm font-mono text-foreground">15.2W</div>
                </div>
              </div>
            </div>
          </div>

          {/* Server Stats */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">SERVER STATS</h2>
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="text-sm text-foreground">Server</div>
                <div className="text-xs text-muted-foreground">6d uptime</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">CPU</div>
                  <div className="text-sm font-mono text-foreground">9%</div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div className="bg-primary h-1 rounded-full" style={{ width: "9%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">RAM</div>
                  <div className="text-sm font-mono text-foreground">13%</div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div className="bg-accent h-1 rounded-full" style={{ width: "13%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">DISK</div>
                  <div className="text-sm font-mono text-foreground">85%</div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div className="bg-secondary h-1 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <nav className="border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded"></div>
                </div>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-foreground font-medium">
                    Home
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Battery
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Thresholds
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    System
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <div className="w-3 h-3 bg-muted rounded-full"></div>
              </div>
            </div>
          </nav>

          {/* Content Grid */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Center Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Search Bar */}
                <div className="space-y-2">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">SEARCH</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type here to search..."
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">⌘</div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">QUICK LINKS</h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-foreground font-medium">Battery</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                          <div className="w-5 h-5 bg-primary rounded"></div>
                          <span>Status Monitor</span>
                          <span className="ml-auto">↗</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                          <div className="w-5 h-5 bg-accent rounded"></div>
                          <span>Health Check</span>
                          <span className="ml-auto">↗</span>
                        </a>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-foreground font-medium">Management</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                          <div className="w-5 h-5 bg-secondary rounded"></div>
                          <span>Thresholds</span>
                          <span className="ml-auto">↗</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                          <div className="w-5 h-5 bg-chart-3 rounded"></div>
                          <span>Power Settings</span>
                          <span className="ml-auto">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    RECENT ACTIVITY
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-background rounded"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">Battery Charged</div>
                        <div className="text-xs text-muted-foreground">Reached 85% threshold</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-background rounded"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">Health Check</div>
                        <div className="text-xs text-muted-foreground">Battery condition: Good</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-background rounded"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">Threshold Updated</div>
                        <div className="text-xs text-muted-foreground">Max charge set to 85%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="text-sm text-muted-foreground">Wattson v1.0.0 ↗</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
